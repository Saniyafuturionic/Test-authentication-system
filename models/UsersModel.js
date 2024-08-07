const mongoose = require('mongoose');
const userSchema = require('../schemas/user_schema');
const { ALREADY_EXIST } = require('../utilities/constant');
const APIError = require('../utilities/error_handling');
const { NoUserFoundException } = require("../utilities/error_handling")

userSchema.statics = {
  /**
   * Create a new user
   * @param {object} newUser
   * @return {Promise<User, APIError>}
   */
  async createUser(newUser) {
    const isExist = await this.findOne({ username: newUser.username });
    if (isExist) {
      throw new APIError(409, ALREADY_EXIST("User"));
    }
    const user = new this(newUser);
    const savedUser = await user.save();
    return savedUser.toObject();
  },
  /** 
    * Get a list of users
    * @return {Promise<Array<Object>, APIError>}
    */
  async readUserList() {
    const userList = await this.find();
    console.log(userList.length, "osdijgf")
    if (userList.length > 0) {
      return userList.map(user => user.toObject());
    } else {
      throw new NoUserFoundException(404, NOT_FOUND_EXCEPTION("User"));
    }
  },
  /** 
 * Update a user
 * @param {object} updatedUser - The updated user data
 * @return {Promise<Object, APIError>}
 */
  async updateUser(updatedUser) {
    const user = await this.findOneAndUpdate(
      { username: updatedUser.username },
      updatedUser,
      { new: true }
    );
    console.log("inside updateuser  ")

    if (user) {
      return user.toObject();
    } else {
      throw new NoUserFoundException(404, NOT_FOUND_EXCEPTION("User"));
    }
  },
  /** 
 * Delete a user
 * @param {object} 
 * @return {Promise<Object, APIError>}
 */
  async deleteUser(deleteUser) {
    const user = await this.findOneAndDelete({ username: deleteUser.username });

    if (user) {
      return user.toObject();
    } else {
      throw new NoUserFoundException(404, NOT_FOUND_EXCEPTION("User"));
    }
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
