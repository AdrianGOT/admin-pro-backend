// ROUTE: /api/users

// Express 
const { Router } = require('express');
const { check } = require('express-validator') ;

// Controllers
const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/user')

// Middlewares
const {checkField} = require('../middleware/check-field');
const {validateJWT} = require('../middleware/validate-jwt');


const router = Router();

// GET methods
router.get('/',[
    validateJWT
], getUsers);

// POST methods
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    checkField,
] ,createUser);

// PUT methods
router.put('/:id',[
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    checkField,
], updateUser)

// delete methods
    router.delete('/:id', validateJWT , deleteUser);


module.exports = router;