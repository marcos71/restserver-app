const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'Missing token authentication'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const authenticatedUser = await User.findById(uid);

        if (!authenticatedUser) {
            return res.status(403).json({
                msg: 'Invalid token - missing authorized user'
            });
        }

        if (authenticatedUser.state === false) {
            return res.status(403).json({
                msg: 'Invalid token - authorized user is disabled'
            });
        }

        req.authenticatedUser = authenticatedUser;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid JWT'
        });
    }
};

module.exports = {
    validateJWT
}