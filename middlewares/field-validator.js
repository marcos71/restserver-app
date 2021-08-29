const { validationResult } = require('express-validator');

const fieldValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

const validateAdminRole = (req, res, next) => {
    if (!req.authenticatedUser) {
        return res.status(401).json({
            msg: 'User token was not validated before'
        });
    }
    
    const { role } = req.authenticatedUser;

    if (role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            msg: 'Invalid token - not authorized for this operation'
        });
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.authenticatedUser) {
            return res.status(401).json({
                msg: 'User token was not validated before'
            });
        }
        
        const { role } = req.authenticatedUser;
        
        if (!roles.includes(role)) {
            return res.status(403).json({
                msg: `Invalid token - roles required ${roles}`
            });
        }
        next();
    };
};

module.exports = {
    fieldValidator,
    validateAdminRole,
    hasRole
}