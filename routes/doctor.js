// Express
const { Router } = require('express');
const { check } = require('express-validator')

// Middlewares
const { validateJWT } = require('../middleware/validate-jwt');
const { checkField } = require('../middleware/check-field')

// Controllers
const { 
    getDoctors,
    updateDoctor,
    deleteDoctor,
    createtDoctor,
} = require('../controllers/doctor');

const router = Router();

// GET methods
router.get('/',
    validateJWT
 ,getDoctors);

// POST methods
router.post('/',[
    validateJWT,
    check('name', 'The doctor name is required').not().isEmpty(),
    check('Hospital', 'The hospital id should be valid').isMongoId(),
    checkField
],createtDoctor);

// PUT methods
router.put('/:id',updateDoctor);

// DELETE methods
router.delete('/:id',deleteDoctor);


module.exports = router;
