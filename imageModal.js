const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        required: true
    },
    imageName: {
        type: String,
        required: true
    }
}, {
    // bliver tilføjet til kollektion på mongo
    collection: "hearts"
});

const imageModal = mongoose.model('imageModel', imageSchema);

module.exports = imageModal;
