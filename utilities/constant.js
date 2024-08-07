const LOGIN = `Logged In Successfully.`
const LOGOUT = `Logged Out Successfully.`
const SIGN_UP = `Sign Up Successfully.`
const INVALID_CREDENTIAL = `Invalid Credential.`
const FAILURE = `Failure Occure.`
const UNAUTHORIZED_USER = `You don't have permission to access this feauture!`
const CREATED = (model_name) => `${model_name} Created Successfully.`
const DELETED = (model_name) => `${model_name} Deleted Successfully.`
const UPDATED = (model_name) => `${model_name} Updated Successfully.`
const RETRIEVE = (model_name) => `${model_name} Retrieve Successfully.`
const ALREADY_EXIST = (model_name) => `${model_name} Already Exist.`
const NOT_FOUND_EXCEPTION = (model_name) => `No ${model_name} Found Exception`

module.exports = {
    LOGIN, LOGOUT, SIGN_UP, INVALID_CREDENTIAL, FAILURE, UNAUTHORIZED_USER, CREATED,
    DELETED, UPDATED, RETRIEVE, ALREADY_EXIST, NOT_FOUND_EXCEPTION
}
