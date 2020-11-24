const knex = require('../database')
const Parser = require('rss-parser');
const parser = new Parser()

module.exports = {
    async findAll(user_id) {
        return await knex('channels')
            .join('channels_users', 'channels.id', 'channels_users.channel_id')
            .where('channels_users.user_id', user_id )
            .select('channels.id', 'channels.title', 'channels.link', 'channels.description', 'channels.image', 'channels.feed')
    },

    async findOne(user_id, channel_id) {
        return await knex('channels')
            .join('channels_users', 'channels.id', 'channels_users.channel_id')
            .where('channels_users.user_id', user_id )
            .where('channels_users.channel_id', channel_id)
            .first('channels.id', 'channels.title', 'channels.link', 'channels.description', 'channels.image', 'channels.feed')
    },

    async store({ title, link, description, image, feed }, user_id) {
        try {
            let id;

            await knex.transaction(async trx => {
                const channel = await trx('channels')
                    .where({ title })
                    .first()
                id = channel?.id
                
                if(!channel) {
                    [ id ] = await trx('channels')
                        .insert({ title, link, description, image, feed })
                }

                await trx('channels_users')
                    .insert({ user_id, 'channel_id': id })
            })

            return await Promise.resolve({ id, title, link, description, image, feed })
        } catch (err) {
            return await Promise.reject(err)
        }
    },

    async destroy(user_id, channel_id) {
        return await knex('channels_users')
            .where({ user_id, channel_id })
            .del()
    },

    async getFeedDetails (feed) {
        const result = await parser.parseURL(feed)
        const {title, link, description} = result
        const image = result.itunes?.image || result.image?.url || result.image
        return {title, link, description, image}
    }
}
