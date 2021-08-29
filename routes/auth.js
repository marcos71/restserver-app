const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    fieldValidator
    ], login);

module.exports =  router