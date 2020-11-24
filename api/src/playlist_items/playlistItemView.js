module.exports = {
    renderOne(playlist, episodes) {
        return {
            id: playlist.id,
            title: playlist.title,
            description: playlist.description,
            episodes: episodes.map(ep => {
                return {
                    id: ep.id,
                    title: ep.title,
                    description: ep.description,
                    link: ep.link,
                    enclosure: {
                        url: ep.media,
                        duration: ep.duration
                    },
                    image: ep.image
                }
            })
        }
    }
}