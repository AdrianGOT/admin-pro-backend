// Express 
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const {validateJWT} = require('../middleware/validate-jwt');

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
],getHospitals);

// POST methods
router.post('/', [
], createHospital);

// PUT methods
router.put('/:id',[
], updateHospital)

// delete methods
router.delete('/:id', deleteHospital);


module.exports = router;