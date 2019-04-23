const mongoose = require('mongoose');

const eboardSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    eboardImage: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('Eboard', eboardSchema);