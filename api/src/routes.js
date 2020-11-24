const express = require('express')
const router = express.Router()

const asyncMiddleware = require('./utils/asyncMiddleware')

const auth = require('./auth/authController')
const Roles = require('./auth/userRoles')

const users = require('./users/userController')
const channels = require('./channels/channelController')
const items = require('./items/itemController')
const playlists = require('./playlists/playlistController')
const playlistItem = require('./playlist_items/playlistItemController')

const userValidation = require('./users/userValidation')
const channelValidation = require('./channels/channelValidation')
const playlistValidation = require('./playlists/playlistValidation')
const playlistItemValidation = require('./playlist_items/playlistItemValidation')

router.get(
    '/users', 
    auth.authorize(Roles.ADMIN),
    asyncMiddleware(users.index)
)
router.get(
    '/user/:id', 
    auth.authorize(Roles.ADMIN),
    userValidation.validateParams(), 
    asyncMiddleware(users.show)
)
router.post(
    '/user', 
    userValidation.validate(), 
    auth.authorize(Roles.ADMIN),
    asyncMiddleware(users.create)
)
router.delete(
    '/user/:id', 
    userValidation.validateParams(), 
    asyncMiddleware(users.destroy)
)

router.get(
    '/channels', 
    asyncMiddleware(channels.index)
)
router.get(
    '/channel/:id', 
    channelValidation.validateParams(), 
    asyncMiddleware(channels.show)
)
router.post(
    '/channel', 
    channelValidation.validate(), 
    asyncMiddleware(channels.create)
)
router.delete(
    '/channel/:id', 
    channelValidation.validateParams(), 
    asyncMiddleware(channels.destroy)
)

router.get(
    '/channel/:id/episodes', 
    channelValidation.validateParams(), 
    asyncMiddleware(items.index)
)

router.get(
    '/playlists', 
    asyncMiddleware(playlists.index)
)
router.get(
    '/playlist/:id', 
    playlistValidation.validateParams(), 
    asyncMiddleware(playlists.show)
)
router.post(
    '/playlist', 
    playlistValidation.validate(), 
    asyncMiddleware(playlists.create)
)
router.delete(
    '/playlist/:id', 
    playlistValidation.validateParams(), 
    asyncMiddleware(playlists.destroy)
)

router.get(
    '/playlist/:id/episodes', 
    playlistItemValidation.validateParams(), 
    asyncMiddleware(playlistItem.index)
)
router.post(
    '/playlist/:id/episodes', 
    playlistItemValidation.validate(), 
    asyncMiddleware(playlistItem.create)
)
router.delete(
    '/playlist/:playlistId/episodes/:episodeId', 
    playlistItemValidation.validateNestedParams(), 
    asyncMiddleware(playlistItem.destroy)
)

module.exports = router