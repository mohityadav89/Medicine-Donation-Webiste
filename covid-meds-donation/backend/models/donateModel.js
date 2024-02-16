const mongoose = require('mongoose')
const validator = require('validator')

const donateSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: [true, 'Please enter your email'],
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    medicine: {
        type: String,
        required: [true, 'Please enter medicine name'],
    },
    expiry: {
        type: String,
        required: [true, 'Please enter medicine expiry date'],
    },
    dosage: {
        type: Number,
        required: [true, 'Please enter dosage'],
    },
    address: {
        type: String,
        required: [true, 'Please enter pickup address'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Donate', donateSchema);