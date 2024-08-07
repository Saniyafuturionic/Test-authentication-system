const mongoose = require("mongoose");
const UserRole = require("../models/UserRole");
const { NoUserFoundException } = require("../utilities/error_handling");
const User = require("../models/UsersModel")

// check authentication middlewere
const isAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({
        success: false,
        user: null,
        message: 'User not authenticated.',
    });
};

// check admin authorization
const isAdmin = async (req, res, next) => {

    const roles = await UserRole.find({ _id: { $in: req.user.role } });

    if (roles.some(role => role.roleType === 'Admin')) {
        return next();
    }

    return res.status(403).json({
        success: false,
        user: null,
        message: 'Unauthorized access',
    });
};

const isObjectOwner = async (req, res, next) => {
    console.log("Is object owner")
    const user = await User.findOne({ username:  req.body.username });

    if (!user) {
        throw new NoUserFoundException(404, NOT_FOUND_EXCEPTION("User"));
    }

    if (user._id.equals(req.user.id)) {
        return next();
    }

    return res.status(403).json({
        success: false,
        user: null,
        message: 'Unauthorized access',
    });
}


const isAuthenticated = [isAuthenticate];
const isAdminAuth = [isAuthenticate, isAdmin];

module.exports = { isAuthenticated, isAdminAuth, isObjectOwner };
