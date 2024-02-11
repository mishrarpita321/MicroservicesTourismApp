const express = require('express');
const router = express.Router();
const Country = require('../models/countryModel');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());
router.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        return cb(null, uniqueSuffix + file.originalname);
    },
});

/**
 * @openapi
 * /countries/addCountry:
 *   post:
 *     tags:
 *       - Country
 *     summary: Add a new country
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - image
 *               - description
 *     responses:
 *       201:
 *         description: Country added successfully
 *       500:
 *         description: Internal Server Error
 */
const upload = multer({ storage: storage });
router.post('/countries/addCountry', upload.single('image'), async (req, res) => {
    try {
        const country = await Country.create({
            name: req.body.name,
            image: req.file.filename,
            description: req.body.description,
        })
        res.status(201).json({ message: 'Country added successfully', country });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /countries:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get all countries
 *     responses:
 *       200:
 *         description: Fetched list of countries
 *       500:
 *         description: Internal Server Error
 */

router.get('/countries', async (req, res) => {
    try {
        const country = await Country.find({})
        res.status(200).json(country);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /countries/getCountry/{id}:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get a country by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country id
 *     responses:
 *       200:
 *         description: Fetched country by id
 *       500:
 *         description: Internal Server Error
 */

router.get('/countries/getCountry/:id', async (req, res) => { 
    try {
        const country = await Country.findById(req.params.id)
        const id = req.params.id;
        res.status(200).json(country);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /countries/update/{id}:
 *   put:
 *     tags:
 *       - Country
 *     summary: Update a country by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - image
 *               - description
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/countries/update/:id',upload.single('image') ,async (req, res) => {
    const id = req.params.id;
    try {
        const updateFields = {
            name: req.body.name,
            description: req.body.description,
        };

        if (req.file) {
            updateFields.image = req.file.filename;
        }

        const result = await Country.findByIdAndUpdate({ _id: id }, updateFields);
        res.status(result ? 200 : 404).json({
            message: result ? 'Country updated successfully' : 'Country not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @openapi
 * /countries/delete/{id}:
 *   delete:
 *     tags:
 *       - Country
 *     summary: Delete a country by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country id
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/countries/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Country.findByIdAndDelete({ _id: id });
        res.status(result ? 200 : 404).json({
            message: result ? 'Country deleted successfully' : 'Country not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @openapi
 * /countries/{countryname}:
 *   get:
 *     tags:
 *       - Country
 *     summary: Get details of a specific country with associated places
 *     parameters:
 *       - in: path
 *         name: countryname
 *         required: true
 *         description: Name of the country to retrieve details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with details of the country and its places
 *       500:
 *         description: Internal server error
 */


/* Scope of improvement: Use message queues to handle the request to get places for a country
Try to use a message queue like RabbitMQ to handle the request to get places for a country. 
This will help in handling the request in an asynchronous manner and also help in scaling the application. */

router.get('/countries/:countryname', async (req, res) => {
    const countryname = req.params.countryname;
    try {
        const countries = await Country.find({ name: countryname })
        const countriesWithPlaces = await Promise.all(countries.map(async country => {
            const placesRes = await axios.get(`http://localhost:7000/places/${country.name}`)
            const places = placesRes.data;
            return {
                ...country.toObject(),
                places
            };
        })
    );
    res.status(200).json(countriesWithPlaces);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;