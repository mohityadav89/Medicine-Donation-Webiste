const Donate = require('../models/donateModel')
const Request = require('../models/requestModel')
const Medicine = require('../models/medicineModel')

exports.requestMedicine = async (req, res, next) => {
    try {
        const { email, medicine, dosage } = req.body;

        await Request.create({
            email,
            medicine,
            dosage
        })

        res.status(200).json({
            success: true
        })

    } catch (error) {
        console.log(error)
        // next(error)
    }
}

exports.donateMedicine = async (req, res, next) => {
    try {
        const { email, medicine, expiry, dosage, address } = req.body;

        await Donate.create({
            email,
            medicine,
            expiry,
            dosage,
            address
        })

        res.status(200).json({
            success: true
        })

    } catch (error) {
        console.log(error)
        // next(error)
    }
}

exports.createMedicine = async (req, res, next) => {
    try {
        const { medicine, expiry, image } = req.body;

        const med = await Medicine.create({
            medicine,
            expiry,
            image
        })

        res.status(200).json({
            success: true,
            med
        })

    } catch (error) {
        console.log(error)
        // next(error)
    }
}

exports.getAllMedicines = async (req, res, next) => {
    try {
        let medicines = await Medicine.find()

        res.status(200).json({
            success: true,
            medicines,
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getSingleMedicine = async (req, res, next) => {
    try {

        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            return res.status(404).json("Medicine not found")
        }

        res.status(200).json({
            success: true,
            medicine,
        })
    } catch (error) {
        console.log(error)
    }
}