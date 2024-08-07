const Joi = require("joi")

const userValidSchema = Joi.object({
    firstName: Joi.string().min(2).max(15).required(),
    lastName: Joi.string().min(2).max(15).optional(),
    username: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(8),
    roleType: Joi.array().length(1)
})

const loginUserValidSchema = Joi.object({
    username: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(8)
})

module.exports = { userValidSchema, loginUserValidSchema }
