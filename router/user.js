const express = require("express")
const router = express.Router();
const { getUser, getAllUser, updateUser } = require("../controller/userController.js")
const { getProfile } = require("../controller/adminController.js");
const { isAdminAuth, isAuthenticated, isObjectOwner } = require("../middlewere/authMiddlewere.js");
const { signUpUserCon, login, add_role } = require("../controller/authController.js");
const { userMiddlewere, loginUserMiddlewere } = require("../middlewere/validationMiddlewere.js");



router.post('/signup', userMiddlewere, signUpUserCon);
router.post('/login', loginUserMiddlewere, login);


// Protected routes for user
router.get('/getUser', isAuthenticated, getUser);
router.get('/getAllUser', getAllUser)
router.patch("/updateUser", [isAuthenticated, isObjectOwner], updateUser)

// protected route for admin
router.get("/get-admin-profile", isAdminAuth, getProfile)


router.post('/add_role', add_role);

module.exports = router;