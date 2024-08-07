const User = require("../models/UsersModel");

async function signUpUser(userData){
    console.log("user data", userData)
    const user = await User.createUser(userData)
    return user
}
module.exports = {signUpUser}