// Express modules
const { Router } = require('express');
const { check } = require('express-validator');

// controllers
const { login, googleSignIn } = require('../controllers/auth')

// Middleware
const { checkField } = require('../middleware/check-field');


// ----------
const router = Router();

// ---- routers
router.post('/', [

], login)


router.post('/google',[
    check('token', 'The google token is required').not().isEmpty(),
    checkField
], googleSignIn)


module.exports = router;