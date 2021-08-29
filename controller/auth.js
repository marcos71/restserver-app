const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../utils/jwt-generator');

const login = async(req = request, res = response) => {

    try {
        const { email, password } = req.body;
        // validate email/user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Email/Password not found'
            })
        }

        // validate user is enabled
        if (!user.state) {
            return res.status(400).json({
                msg: `The user ${email} is disabled`
            });
        }

        // validate password is correct
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'The password is incorrect'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error trying to login the user'
        })
    }
};

module.exports = {
    login
}