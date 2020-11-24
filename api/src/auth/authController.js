const { promisify } = require('util')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('../database')
const { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError } = require('../utils/AppError')
const asyncMiddleware = require('../utils/asyncMiddleware')
const userService = require('../users/userService')

require('./googleAuth')(passport)
require('./jwtAuth')(passport)

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function findOrCreate({ social_id, name, email }) {
    const user = await knex('users')
        .where('email', email)
        .first()
    
    if(!user) {
        const google_user = await knex('users')
            .insert({ name, email, social_id, role:'STANDARD' })
            .then(result => {
                const [ id ] = result
                return { id }            
            })
            .catch(err => { throw new BadRequestError('User is already exists') })
        return google_user
    }

    return user
}

module.exports = {
    async authLocal(req, res) {
        const { email, pass } = req.body
        
        const user = await knex('users')
            .where('email', email)
            .first()
        if(!user) throw new NotFoundError('Email or/and Password is/are wrong')
        
        const decodedPass = await bcrypt.compare(pass, user.pass);
        if (!decodedPass) throw new NotFoundError('Email or/and Password is/are wrong');

        const token = generateToken({ sub: user.id })
        res.json({ token }) // redirect jwt token to app
    },

    authGoogle() {
        return passport.authenticate('google', { scope: ['profile', 'email'], session: false })
    },

    authGoogleRedirect() {
        return [
            passport.authenticate('google', { session: false, failureRedirect: process.env.BASE_URL }), 
            asyncMiddleware(async(req, res) => {
                const { sub:social_id, name, email } = req.user
                const user = await findOrCreate({ social_id, name, email })
                const token = generateToken({ sub: user.id })
                res.redirect(`${process.env.APP_URL}/token/?token=${token}`); // redirect jwt token to app
            })
        ]
    },

    async authRegister(req, res) {
        const { name, email, pass } = req.body
        /* const hashedPass = await bcrypt.hash(pass, 10);
        const user = await knex('users')
            .insert({ name, email, pass: hashedPass, role:'STANDARD' })
            .then(result => {
                const [ id ] = result
                return { id, name, email, pass }            
            })
            .catch(err => { throw new BadRequestError('User is already exists') }) */
        const user = await userService.store({ name, email, pass, role:'STANDARD' })
            .catch(err => { throw new BadRequestError('User is already exists') })

        const token = generateToken({ sub: user.id })
        res.json({ token }) // redirect jwt token to app
    },

    /* authenticate() {
        return passport.authenticate('jwt', { session: false })
    }, */

    authenticate() {
        return asyncMiddleware(async function (req, res, next) {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) throw new UnauthorizedError('Empty Token')

            const verify = promisify(jwt.verify)
    
            const decodedToken = await verify(token, process.env.JWT_SECRET)
                .catch(err => { throw new UnauthorizedError('Invalid Token') })
            
            const user = await knex('users')
                .where('id', decodedToken.sub)
                .first()
            if(!user) throw new NotFoundError('Not Found User')

            const { id, role } = user
            req.user = { id, role }
            
            next();
        })
    },

    authorize(role) {
        return asyncMiddleware(async function (req, res, next) {
            if(req.user?.role !== role) throw new ForbiddenError('Forbidden Access')
            next();
        })
    }
}