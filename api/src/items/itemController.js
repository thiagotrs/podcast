const { NotFoundError } = require('../utils/AppError')
const channelService = require('../channels/channelService')
const itemService = require('./itemService')
const { renderOne } = require('./itemView')

module.exports = {
    async index(req, res, next) {
        const user_id = req.user.id
        channel_id = req.params.id

        const channel = await channelService.findOne(user_id, channel_id)
        if(!channel) throw new NotFoundError('Not Found Channel')
        const items = await itemService.getFeedItemsDetails(channel.feed)
            .catch(err => { throw new NotFoundError('Feed is outdated') })

        res.json(renderOne({ ...channel, items }))
    }
}
