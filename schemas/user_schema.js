const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            allowNull: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\S+@\S+\.\S+$/.test(v); // Simple email validation
                },
                message: props => `${props.value} is not a valid email!`
            },
        },
        password: {
            type: String,
            minlength: 4,
            maxlength: 10,
            required: true,
        },
        role: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user_role",
            required: true,
        }]
    },
    { timestamps: true }
);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = userSchema;
