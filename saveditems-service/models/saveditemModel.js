const mongoose = require('mongoose');

const saveditemSchema = mongoose.Schema({
    place: String,
    email: String,
    country: String,
    image: String,
    date: {
        type: Date,
        default: Date.now
    },
})

const SavedItem = mongoose.model('saveditems', saveditemSchema);
module.exports = SavedItem;