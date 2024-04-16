// Express
const { Router } = require('express');

// Middlewares

// Controllers
const { 
    getDoctors,
    updateDoctor,
    deleteDoctor,
    createtDoctor,
} = require('../controllers/doctor')

const router = Router();

// GET methods
router.get('/', getDoctors);
// POST methods
router.post('/',createtDoctor);
// PUT methods
router.put('/:id',updateDoctor);
// DELETE methods
router.delete('/:id',deleteDoctor);


module.exports = router;
