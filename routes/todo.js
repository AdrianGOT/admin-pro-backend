// Express
const { Router } = require('express');

// Middlewares
const { validateJWT } = require('../middleware/validate-jwt');

// constrollers
const { getAll, getAllByCollections } = require('../controllers/todo');

const router = Router();

router.get('/:search', validateJWT, getAll );
router.get('/collection/:table/:search', validateJWT, getAllByCollections );

module.exports = router;