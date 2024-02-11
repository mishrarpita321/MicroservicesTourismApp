const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
})

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;