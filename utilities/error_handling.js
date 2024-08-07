class APIError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.data = null
        this.error = true
    }
}
class BadRequestDataError extends APIError {
    constructor(statusCode, message, data) {
        super(statusCode, message); // Call parent constructor
        this.name = 'BadRequestDataError';
        this.data = data; // Set data to passed value
    }
}

class NoUserFoundException extends APIError {
    constructor(statusCode, message, data) {
        super(statusCode, message); // Call parent constructor
        this.name = 'NoUserFoundException';
        this.data = data; // Set data to passed value
    }
}

module.exports = { APIError, BadRequestDataError, NoUserFoundException };
