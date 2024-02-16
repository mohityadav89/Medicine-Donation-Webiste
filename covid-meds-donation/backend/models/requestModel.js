const mongoose = require('mongoose')
const validator = require('validator')

const requestSchema = new mongoose.Schema({
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
    dosage: {
        type: Number,
        required: [true, 'Please enter dosage'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Request', requestSchema);