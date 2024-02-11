const express = require('express')
const router = express.Router()
const cors = require('cors')
const Place = require('../models/placeModel')
const multer = require('multer')

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());
router.use(express.static('public'));


/* Scope of improvement: Storing images in a cloud storage service like AWS S3 or Google Cloud Storage */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        return cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({ storage: storage });
const uploadImage = upload.fields([
    { name: 'imageMain' },
    { name: 'image', maxCount: 1 },
]);
/**
 * @openapi
 * /places/addPlaces:
 *   post:
 *     tags:
 *       - Places
 *     summary: Add a new place
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageMain:
 *                 type: string
 *               image:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - imageMain
 *               - image
 *               - country
 *               - description
 *     responses:
 *       201:
 *         description: Place added successfully
 *       500:
 *         description: Internal Server Error
 */

router.post('/places/addPlaces', uploadImage, async (req, res) => {
    try {
        const place = await Place.create({
            name: req.body.name,
            imageMain: req.files.imageMain[0].filename,
            image: req.files.image[0].filename,
            country: req.body.country,
            description: req.body.description,
        })
        res.status(201).json({ place, message: 'Place added successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /places/getPlaces:
 *   get:
 *     tags:
 *       - Places
 *     summary: Get all places
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

router.get('/places/getPlaces', async (req, res) => {
    try {
        const place = await Place.find({})
        res.status(200).json(place);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /places/getPlaces/{id}:
 *   get:
 *     tags:
 *       - Places
 *     summary: Get place by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The place id
 *     responses:
 *       200:
 *         description: Fetched place by id
 *       500:
 *         description: Internal Server Error
 */

router.get('/places/getPlaces/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const place = await Place.findById(id);
        res.status(200).json(place);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

/**
 * @openapi
 * /places/update/{id}:
 *   put:
 *     tags:
 *       - Places
 *     summary: Update a place by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The place id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageMain:
 *                 type: string
 *               image:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - imageMain
 *               - image
 *               - country
 *               - description
 *     responses:
 *       200:
 *         description: Place updated successfully
 *       500:
 *         description: Internal Server Error
 */

router.put('/places/update/:id', uploadImage, async (req, res) => {
    const id = req.params.id;
    try {
        const updateFields = {
            name: req.body.name,
            country: req.body.country,
            description: req.body.description,
        };

        if (req.files.imageMain && req.files.imageMain.length > 0) {
            updateFields.imageMain = req.files.imageMain[0].filename;
        }

        if (req.files.image && req.files.image.length > 0) {
            updateFields.image = req.files.image[0].filename;
        }

        const result = await Place.findByIdAndUpdate({ _id: id }, updateFields);
        res.status(result ? 200 : 404).json({
            message: result ? 'Place updated successfully' : 'Place not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @openapi
 * /places/delete/{id}:
 *   delete:
 *     tags:
 *       - Places
 *     summary: Delete a place by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The place id
 *     responses:
 *       200:
 *         description: Place deleted successfully
 *       404:
 *         description: Place not found
 *       500:
 *         description: Internal Server Error
 */

router.delete('/places/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Place.findByIdAndDelete({ _id: id });
        res.status(result ? 200 : 404).json({
            message: result ? 'Place deleted successfully' : 'Place not found'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @openapi
 * /places/{countryName}:
 *   get:
 *     tags:
 *       - Places
 *     summary: Get places by country name
 *     parameters:
 *       - in: path
 *         name: countryName
 *         required: true
 *         schema:
 *           type: string
 *         description: The country name
 *     responses:
 *       200:
 *         description: Fetched places by country name
 *       500:
 *         description: Internal Server Error
 */

router.get('/places/:countryName', async (req, res) => {
    try {
        const { countryName } = req.params;
        const places = await Place.find({ country: countryName });

        res.status(200).json(places);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @openapi
 * /countries/{countryName}/{placeName}:
 *   get:
 *     tags:
 *       - Places
 *     summary: Get place by country name and place name
 *     parameters:
 *       - in: path
 *         name: countryName
 *         required: true
 *         schema:
 *           type: string
 *         description: The country name
 *       - in: path
 *         name: placeName
 *         required: true
 *         schema:
 *           type: string
 *         description: The place name
 *     responses:
 *       200:
 *         description: Fetched place by country name and place name
 *       404:
 *         description: Place not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/places/countries/:countryName/:placeName', async (req, res) => {
    try {
        const { countryName, placeName } = req.params;
        const place = await Place.findOne({ country: countryName, name: placeName });

        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;