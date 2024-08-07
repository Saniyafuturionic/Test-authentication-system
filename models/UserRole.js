const { default: mongoose } = require("mongoose");

const userRoleSchema = new mongoose.Schema(
    {

        roleType: {
            type: String,
            required: true,

        }
    }
)

const UserRole = mongoose.model('user_roles', userRoleSchema)
module.exports = UserRole;