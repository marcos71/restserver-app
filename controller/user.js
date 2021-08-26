const { request, response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUser = async (req = request, res = response) => {
    //const {q, name = "No name", page} = req.query;
    const { limit = 5, from = 0 } = req.query;
    const queryActiveUsers = { state: true };
    
    const [total, users] = await Promise.all([
        User.countDocuments(queryActiveUsers),
        User.find(queryActiveUsers)
        .skip(Number(from))
        .limit(Number(limit))
    ]);
    /*
    res.json({
        message: 'get API - controller',
        q,
        name,
        page
    });
    */
   res.json({total, users});
};

const putUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, google, ...params} = req.body;

    if (password) {
        // hash password
        const salt = bcryptjs.genSaltSync();
        params.password = bcryptjs.hashSync(password, salt);
    }

    const userUpdated = await User.findByIdAndUpdate(id, params);

    res.json({
        message: 'put API - controller',
        user: userUpdated
    });
};

const postUser = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // hash password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        message: 'post API - controller',
        user
    });
};

const deleteUser = async(req = request, res = response) => {
    const { id } = req.params;

    // hard delete
    // const userDeleted = await User.findByIdAndDelete(id);
    //soft delete
    const userDeleted = await User.findByIdAndUpdate(id, { state: false });
    res.json({
        message: 'delete API - controller',
        user: userDeleted
    });
};

module.exports = { getUser, putUser, postUser, deleteUser }