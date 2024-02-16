const express = require('express')
const router = express.Router()

const { requestMedicine, donateMedicine, createMedicine, getAllMedicines, getSingleMedicine } = require('../controllers/medicineController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/request').post(requestMedicine)
router.route('/medicines').get(getAllMedicines)
router.route('/donate').post(donateMedicine)
router.route('/medicine/:id').get(getSingleMedicine)
router.route('/medicine/new').post(isAuthenticatedUser, authorizeRoles('admin'), createMedicine);

module.exports = router