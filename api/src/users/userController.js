const { NotFoundError, BadRequestError } = require('../utils/AppError')
const userService = require('./userService')
const { renderOne, renderMany } = require('./userView')

module.exports = {
    async index(req, res, next) {
        const users = await userService.findAll()
        res.json(renderMany(users))
    },

    async show(req, res, next) {
        const user_id = req.params.id
        const user = await userService.findOne(user_id)
        if(!user) throw new NotFoundError('Not Found User')
        res.json(renderOne(user))
    },

    async create(req, res, next) {
        const { name, email, pass, role } = req.body
        const user = await userService.store({ name, email, pass, role })
            .catch(err => { throw new BadRequestError('User is already exists') })
        res.status(201).json(renderOne(user))
    },

    async destroy(req, res, next) {
        const user_id = req.params.id
        const rst = await userService.destroy(user_id)
        if(!rst) throw new NotFoundError('Not Found User')
        res.status(204).send()
    }
}