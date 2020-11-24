const { InternalError } = require('./AppError')

const errorHandler = err => {
    console.log(err)
    return err.isOperational ? err : new InternalError('Something is wrong')
}

module.exports = errorHandler