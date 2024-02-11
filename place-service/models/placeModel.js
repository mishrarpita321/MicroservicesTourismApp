const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    name: String,
    imageMain: String,
    image: String,
    country: String,
    description: String,
})

const Place = mongoose.model('places', placeSchema);
module.exports = Place;