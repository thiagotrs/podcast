const knex = require('../database')

module.exports = {
    async findAll(user_id, playlist_id) {
        return await knex('episodes')
            .join('episodes_playlists', 'episodes.id', 'episodes_playlists.episode_id')
            .join('playlists', 'playlists.id', 'episodes_playlists.playlist_id')
            .select('episodes.id', 'episodes.title', 'episodes.description', 'episodes.link', 'episodes.media', 'episodes.duration', 'episodes.image')
            .where('episodes_playlists.playlist_id', playlist_id)
            .where('playlists.user_id', user_id)
    },

    async destroy(playlist_id, episode_id) {
        return await knex('episodes_playlists')
            .where({ episode_id, playlist_id })
            .del()
    },

    async store({ title, description, link, media, duration, image }, playlist_id) {
        try {
            let id;            
            await knex.transaction(async trx => {
                const episode = await trx('episodes')
                    .where({ title })
                    .first()
                id = episode?.id

                if(!episode) {
                    [ id ] = await trx('episodes')
                        .insert({ title, description, link, media, duration, image })
                }
                await trx('episodes_playlists')
                    .insert({ playlist_id, 'episode_id': id })
            })

            return await Promise.resolve({ id, title, description, link, media, duration, image })
        } catch (err) {
            return await Promise.reject(err)
        }
    }
}