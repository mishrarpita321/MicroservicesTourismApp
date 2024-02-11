const express = require('express');
const router = express.Router();
const SavedItem = require('../models/saveditemModel');
const cors = require('cors');

const Redis = require("ioredis");

const client = new Redis("redis://default:rYdKAfTI4EYXr1Ymih5KUxqTqhuI9AaN@redis-13358.c293.eu-central-1-1.ec2.cloud.redislabs.com");

router.use(express.json()); //Middleware to parse the JSON data
router.use(cors());

router.post('/saveditems/addSavedItem', async (req, res) => {
    try {
        const saveditem = await SavedItem.create(req.body)
        // Add the saved item to Redis cache
        await client.set(`saveditem:${saveditem._id}`, JSON.stringify(saveditem));
        res.status(201).json(saveditem);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message })
    }
});

/* Redis cache */
// router.get('/saveditems', async (req, res) => {
//     try {
//         // Check if the data exists in Redis cache
//         const cachedData = await client.get('saveditems');
//         if (cachedData) {
//             res.status(200).json(JSON.parse(cachedData));
//         } else {
//             const saveditems = await SavedItem.find({});
//             // Add the retrieved data to Redis cache
//             await client.set('saveditems', JSON.stringify(saveditems));
//             res.status(200).json(saveditems);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: error.message });
//     }
// });

router.get('/saveditems', async (req, res) => {
    try {
        const saveditem = await SavedItem.find({})
        res.status(200).json(saveditem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

router.get('/saveditems/get/:id', async (req, res) => {
    try {
        const cachedData = await client.get(`saveditem:${req.params.id}`);
        if (cachedData) {
            res.status(200).json(JSON.parse(cachedData));
        } else {
            const saveditem = await SavedItem.findById(req.params.id);
            if (saveditem) {
                // Add the retrieved data to Redis cache
                await client.set(`saveditem:${saveditem._id}`, JSON.stringify(saveditem));
                res.status(200).json(saveditem);
            } else {
                res.status(404).json({ message: 'SavedItem not found' });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/saveditems/update/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`request: ${req.body}`);
    // console.log(`id: ${id}`);
    try {
        const result = await SavedItem.findByIdAndUpdate({ _id: id }, {
            place: req.body.place,
            email: req.body.email,
            country: req.body.country,
            date: req.body.date,
        });

        if (result) {
            // If the item is updated, remove it from Redis cache
            await client.del(`saveditem:${id}`);
            res.status(200).json({ message: 'SavedItem updated successfully' });
        } else {
            res.status(404).json({ message: 'SavedItem not found' });
        }

        console.log(`result: ${result}`);
        res.status(result ? 200 : 404).json({
            message: result ? 'SavedItem updated successfully' : 'SavedItem not found'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/saveditems/delete/:id', async (req, res) => {
    try {
        const result = await SavedItem.findByIdAndDelete(req.params.id);
        // If the item is deleted, also remove it from Redis cache
        if (result) {
            await client.del(`saveditem:${req.params.id}`);
        }
        res.status(result ? 200 : 404).json({
            message: result ? 'SavedItem deleted successfully' : 'SavedItem not found'
        });
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;