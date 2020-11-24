const knex = require('../database')

module.exports = {
    async findAll(user_id) {
        return await knex('playlists')
            .where({ user_id })
            .select('id', 'title', 'description')
    },

    async findOne(user_id, playlist_id) {
        return await knex('playlists')
            .where({ user_id })
            .where('id', playlist_id)
            .first('id', 'title', 'description')
    },

    async store({ title, description, user_id }) {
        return await knex('playlists')
            .insert({ title, description, user_id })
            .then(rst => {
                const [ id ] = rst
                return { id, title, description }
            })
    },

    async destroy(user_id, playlist_id) {
        return await knex('playlists')
            .where({ user_id, id: playlist_id })
            .del()
    },

    async update({ title, description }, user_id, playlist_id) {
        return await knex('playlists')
            .update({ title, description })
            .where({ user_id, id: playlist_id })
    }
}