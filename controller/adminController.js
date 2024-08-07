const asyncHandler = require("express-async-handler")

exports.getProfile = asyncHandler(async(req, res, next)=>{
    res.status(200).json({
        success: true,
        data: req.user,
        message: "Admin Profile"
    })
});