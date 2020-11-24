module.exports = {
    renderOne(playlist) {
        return {
            id: playlist.id,
            title: playlist.title,
            description: playlist.description,
        }
    },

    renderMany(playlists) {
        return playlists.map(playlist => ({
            id: playlist.id,
            title: playlist.title,
            description: playlist.description,
        }))
    }
}