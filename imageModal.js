const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    // Other fields can be defined here
    isActive: {
        type: Boolean,
        required: true
    },
    imageName: {
        type: String,
        required: true
    }
}, {
    collection: "hearts"
});

const imageModal = mongoose.model('imageModel', imageSchema);

module.exports = imageModal;
