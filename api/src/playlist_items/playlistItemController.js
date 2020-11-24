const knex = require('../database')
const { renderOne } = require('./playlistItemView')
const { NotFoundError, BadRequestError } = require('../utils/AppError')
const playlistService = require('../playlists/playlistService')
const playlistItemService = require('../playlist_items/playlistItemService')

module.exports = {
    async index(req, res, next) {
        const user_id = req.user.id
        const playlist_id = req.params.id

        const playlist = await playlistService.findOne(user_id, playlist_id)
        if(!playlist) throw new NotFoundError('Not Found Playlist')
        const episodes = await playlistItemService.findAll(user_id, playlist_id)

        res.json(renderOne(playlist, episodes))
    },

    async create(req, res, next) {
        const user_id = req.user.id
        const playlist_id = req.params.id
        const { title, description, link, enclosure: { url:media, duration }, image } = req.body

        const playlist = await playlistService.findOne(user_id, playlist_id)
        if(!playlist) throw new NotFoundError('Not Found Playlist')
        
        const episode = await playlistItemService
            .store({ title, description, link, media, duration, image }, playlist_id)
            .catch(err => { throw new BadRequestError('Episode is already exists in Playlist') })

        res.status(201).json(episode)
    },

    async destroy(req, res, next) {
        const user_id = req.user.id
        const playlist_id = req.params.playlistId
        const episode_id = req.params.episodeId

        const playlist = await playlistService.findOne(user_id, playlist_id)
        if(!playlist) throw new NotFoundError('Not Found Playlist')

        const rst = await playlistItemService.destroy(playlist_id, episode_id)
        if(!rst) throw new NotFoundError('Not Found Episode')

        res.status(204).send()
    }
}
