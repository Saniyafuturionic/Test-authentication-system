const { BadRequestDataError, NoUserFoundException } = require('../utilities/error_handling');

const errorHandler = (err, req, res, next) => {

    console.log("Error handler")
    if (err instanceof BadRequestDataError) {
        return res.status(err.statusCode).json({
            error: true,
            message: err.message,
            data: null,
            status_code: 400
        });
    }
    else if (err instanceof NoUserFoundException) {
        return res.status(err.statusCode).json({
            error: true,
            message: err.message,
            data: null,
            status_code: 400
        });
    }
    
    console.log(err)
    return res.status(500).json({
        error: true,
        message: err.messsage,
        data: null,
        status_code: 400
    });
};

module.exports = errorHandler;
