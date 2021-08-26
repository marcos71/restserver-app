const { Router } = require('express');
const { getUser, postUser, putUser, deleteUser } = require('../controller/user');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { isRoleValid, existsEmail, existsUserById } = require('../utils/db-validators')

const router = Router();

router.get('/', getUser);

router.put('/:id', [
    check('id', 'Not a valid Mongo ID').isMongoId(),
    check('id').custom(existsUserById),
    fieldValidator
], putUser);

router.post('/', [
    check('name', 'Name is not present').not().isEmpty(),
    check('password', 'Password must have more than 6').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( existsEmail ),
    //check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    fieldValidator
], postUser);

router.delete('/:id', [
    check('id', 'Not a valid Mongo ID').isMongoId(),
    check('id').custom(existsUserById),
    fieldValidator
], deleteUser);

module.exports =  router