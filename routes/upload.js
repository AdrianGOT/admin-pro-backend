// Express
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

// Middlewares
const { validateJWT } = require('../middleware/validate-jwt');
const {checkUserExist, checkValidTable} = require('../middleware/check-table-type');

// constrollers
const { fileUpload, returnImage } = require('../controllers/upload');

const router = Router();

router.use( expressFileUpload() );

router.put('/:type/:id', [
    validateJWT,
    checkValidTable,
], fileUpload )

router.get('/:type/:photo', [
    validateJWT,
    checkValidTable,
], returnImage )

module.exports = router;