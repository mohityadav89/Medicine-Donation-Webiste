const Order = require('../models/orderModel')

exports.newOrder = async (req, res, next) => {
    try {
        const {
            orderItems,
            email,
            address
        } = req.body;

        const order = await Order.create({
            orderItems,
            email,
            address
        })

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error)
    }
}