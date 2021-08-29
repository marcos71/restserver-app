const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, postUser, putUser, deleteUser } = require('../controller/user');
const { fieldValidator, hasRole } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isRoleValid, existsEmail, existsUserById } = require('../utils/db-validators');

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
    validateJWT,
    //validateAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id', 'Not a valid Mongo ID').isMongoId(),
    check('id').custom(existsUserById),
    fieldValidator
], deleteUser);

module.exports =  router