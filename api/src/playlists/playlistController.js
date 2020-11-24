const { NotFoundError, BadRequestError } = require('../utils/AppError')
const playlistService = require('./playlistService')
const { renderOne, renderMany } = require('./playlistView')

module.exports = {
    async index(req, res, next) {
        const user_id = req.user.id
        const playlists = await playlistService.findAll(user_id)
        res.json(renderMany(playlists))
    },

    async show(req, res, next) {
        const user_id = req.user.id
        const playlist_id = req.params.id
        const playlist = await playlistService.findOne(user_id, playlist_id)
        if(!playlist) throw new NotFoundError('Not Found Playlist')
        res.json(renderOne(playlist))
    },

    async create(req, res, next) {
        const user_id = req.user.id
        const { title, description } = req.body
        const playlist = await playlistService.store({ title, description, user_id })
            .catch(err => { throw new BadRequestError('Playlist is already exists') })
        res.status(201).json(renderOne(playlist))
    },

    async destroy(req, res, next) {
        const user_id = req.user.id
        const playlist_id = req.params.id
        const rst = await playlistService.destroy(user_id, playlist_id)
        if(!rst) throw new NotFoundError('Not Found Playlist')
        res.status(204).send()
    },

    async update(req, res, next) {
        const user_id = req.user.id
        const playlist_id = req.params.id
        const { title, description } = req.body
        const rst = await playlistService.update({ title, description }, user_id, playlist_id)
        if(!rst) throw new NotFoundError('Not Found Playlist')
        res.status(204).send()
    },
}
