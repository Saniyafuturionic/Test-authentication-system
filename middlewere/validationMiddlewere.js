const { BadRequestDataError } = require('../utilities/error_handling');
const { userValidSchema, loginUserValidSchema } = require("../utilities/validation_schema");

const userMiddlewere = (req, res, next) => {
    
    const { error } = userValidSchema.validate(req.body);
    
    if (error) {
        console.log(error);
        return next(new BadRequestDataError(400, error.details[0].message));
    }
    next();
};


const loginUserMiddlewere = (req, res, next) => {
 
    const { error } = loginUserValidSchema.validate(req.body);
    if (error) {
        console.log(error);
        return next(new BadRequestDataError(400, error.details[0].message));
    }
    next();
};

module.exports = { userMiddlewere, loginUserMiddlewere };
