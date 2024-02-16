const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    medicine: {
        type: String,
        required: [true, 'Please enter medicine name'],
        trim: true,
    },
    expiry: {
        type: String,
        required: [true, 'Please enter medicine expiry date'],
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Medicine', medicineSchema);