const User = require('../models/user');

const getUser = (req, res) => {
    const {q, name = "No name", page} = req.query;
    
    res.json({
        message: 'get API - controller',
        q,
        name,
        page
    });
};

const putUser = (req, res) => {
    const { id } = req.params;

    res.json({
        message: 'put API - controller',
        id
    });
};

const postUser = async (req, res) => {
    const body = req.body;
    const user = new User(body);

    await user.save();

    res.json({
        message: 'post API - controller',
        user
    });
};

const deleteUser = (req, res) => {
    res.json({
        message: 'delete API - controller'
    });
};

module.exports = { getUser, putUser, postUser, deleteUser }