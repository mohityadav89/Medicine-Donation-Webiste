const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: [true, 'Please enter your email'],
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    address: {
        type: String,
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            medicine: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
}, { timestampes: true })

module.exports = mongoose.model('Order', orderSchema)