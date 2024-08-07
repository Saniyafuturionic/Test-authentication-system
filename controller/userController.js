const { CREATED } = require("../utilities/constant.js");
const asyncHandler = require("express-async-handler");
const User = require("../models/UsersModel");

exports.getUser = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
        message: "Profile access successfull",
    });
});

exports.getAllUser = asyncHandler(async (req, res) => {
    try {
        const userData = req.body
        const result = await User.readUserList()
        return res.status(201).json({
            data: result,
            error: false,
            status_code: 201,
            message: CREATED("User"),
        });
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            data: null,
            error: false,
            status_code: 400,
            message: error,
        });
    }
});

exports.updateUser = asyncHandler(async (req, res) => {
    console.log("caling update")
    const { firstName, lastName, username, role } = req.body
    try {
        const userData = req.body;
        const result = await User.updateUser(userData);

        return res.status(200).json({
            data: result,
            error: false,
            status_code: 200,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            data: null,
            error: true,
            status_code: 400,
            message: error.message,
        });
    }
});
