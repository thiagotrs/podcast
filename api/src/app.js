require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { errors } = require('celebrate')

const router = require('./routes')
const { NotFoundError } = require('./utils/AppError')
const errorHandler = require('./utils/errorHandler')

const asyncMiddleware = require('./utils/asyncMiddleware')
const auth = require('./auth/authController')

process.on('uncaughtException', err => {
    const error = errorHandler(err)
    if(!error.isOperational) {
        process.exit(1)
    }
})

process.on('unhandledRejection', err => {
    throw err
})

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ status: '👍' })
})

app.post('/auth', asyncMiddleware(auth.authLocal))
app.post('/auth/signup', asyncMiddleware(auth.authRegister))
app.get('/auth/google', auth.authGoogle())
app.get('/auth/google/redirect', auth.authGoogleRedirect())

app.use('/api', auth.authenticate(), router)

app.use(errors())

app.all('*', (req, res, next) => {
    next(new NotFoundError('Not Found Route'))
})

app.use((err, req, res, next) => {
    const error = errorHandler(err)
    res.status(error.statusCode).json({ error: error.message })
})

module.exports = app