// Express modules
const { Router } = require('express');

// own modules
const { login } = require('../controllers/auth')

// controllers

// ----------
const router = Router();

// ---- routers
router.post('/', [

], login)

module.exports = router;