const Role  = require('../models/role');
const User  = require('../models/user');

const isRoleValid = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`The role ${role} does not exist in DB`);
    }
};

const existsEmail = async (email = '') => {
    const existsEmail = await User.findOne({email: email});
    if (existsEmail) {
        throw new Error(`The email ${email} already exists in DB`);
    }   
};

const existsUserById = async (id = '') => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`There is no user with id: ${id}`);
    }   
};

module.exports = {
    isRoleValid,
    existsEmail,
    existsUserById
}