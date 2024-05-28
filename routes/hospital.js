// Express 
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const {validateJWT} = require('../middleware/validate-jwt');
const {checkField} = require('../middleware/check-field');

// controllers 
const {
    getHospitals,
    deleteHospital,
    updateHospital,
    createHospital
} = require('../controllers/hospitals');

const router = Router();

// GET methods
router.get('/',[
    validateJWT
],getHospitals);

// POST methods
router.post('/', [
    validateJWT,
    check('name', 'The hospital name is required').not().isEmpty(),
    checkField
], createHospital);

// PUT methods
router.put('/:id',[
    validateJWT,
    check('name', 'The hospital name is required').not().isEmpty(),
    checkField
], updateHospital)

// delete methods
router.delete('/:id',
    validateJWT,
deleteHospital);


module.exports = router;