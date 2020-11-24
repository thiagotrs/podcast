const { NotFoundError, BadRequestError } = require('../utils/AppError')
const channelService = require('./channelService')
const { renderMany, renderOne } = require('./channelView')

module.exports = {
    async index(req, res, next) {
        const user_id = req.user.id
        const channels = await channelService.findAll(user_id)
        res.json(renderMany(channels))
    },

    async show(req, res, next) {
        const user_id = req.user.id
        const channel_id = req.params.id
        const channel = await channelService.findOne(user_id, channel_id)
        if(!channel) throw new NotFoundError('Not Found Channel')
        res.json(renderOne(channel))
    },

    async create(req, res, next) {
        const user_id = req.user.id
        const { feed } = req.body
        const { title, link, description, image } = await channelService.getFeedDetails(feed)
            .catch(err => { throw new BadRequestError('Feed is wrong') })
        const channel = await channelService.store({ title, link, description, image, feed }, user_id)
            .catch(err => { throw new BadRequestError('Channel is already exists') })
        res.status(201).json(renderOne(channel))
    },

    async destroy(req, res, next) {
        const user_id = req.user.id
        const channel_id = req.params.id
        const rst = await channelService.destroy(user_id, channel_id)
        if(!rst) throw new NotFoundError('Not Found Channel')
        res.status(204).send()
    }
}
