class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true

        // Error.call(this);
        // Error.captureStackTrace(this);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
        super(message, 404)
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Bad Request') {
        super(message, 400)
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401)
    }
}

class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, 403)
    }
}

class InternalError extends AppError {
    constructor(message = 'Internal Error') {
        super(message, 500)
        this.isOperational = false
    }
}

module.exports = { 
    AppError, 
    NotFoundError, 
    BadRequestError, 
    UnauthorizedError, 
    ForbiddenError, 
    InternalError 
}