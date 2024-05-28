// Express modules
const { Router } = require('express');
const { check } = require('express-validator');

// controllers
const { login, googleSignIn, renewToken } = require('../controllers/auth')

// Middleware
const { checkField } = require('../middleware/check-field');
const { validateJWT } = require('../middleware/validate-jwt');

// ----------
const router = Router();

// ---- routers
router.post('/', [

], login)


router.post('/google',[
    check('token', 'The google token is required').not().isEmpty(),
    checkField
], googleSignIn)


router.get('/renew', validateJWT, renewToken )

module.exports = router;