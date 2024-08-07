
const UserRole = require("../models/UserRole.js")
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const authService = require("../services/authService.js");
const { CREATED, FAILURE } = require("../utilities/constant.js");


exports.signUpUserCon = asyncHandler(async (req, res) => {
    try {
        const userData = req.body
        const { firstName, lastName, username, role } = req.body
        const result = await authService.signUpUser(userData)
        return res.status(201).json({
            data: result,
            error: false,
            status_code: 201,
            message: CREATED("User"),
        });
    }
    catch (error) {
        return res.status(400).json({
            data: null,
            error: false,
            status_code: 400,
            message: FAILURE,
        });
    }




})



exports.login = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        const { username, password } = req.body
        console.log(err)
        if (err) {
            return res.status(400).json({
                success: true,
                user: null,
                message: "Login Failed",
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred during login',
                    error: err.message
                });
            }
            return res.status(200).json({
                success: true,
                user: req.user,
                message: 'Login successfully',
            });
        });
    })(req, res, next)
});

exports.add_role = asyncHandler(async (req, res) => {
    const role = await UserRole.findOne({ roleType: req.body.roleType });

    if (role) {
        return res.status(400).send("User role already exists");
    }
    await UserRole.create(req.body);
    return res.status(201).send("Role Created Successfully");
});

