module.exports = {
    renderOne(channel) {
        return {
            id: channel.id,
            title: channel.title,
            link: channel.link,
            description: channel.description,
            image: channel.image,
            feed: channel.feed
        }
    },

    renderMany(channels) {
        return channels.map(channel => ({
            id: channel.id,
            title: channel.title,
            link: channel.link,
            description: channel.description,
            image: channel.image,
            feed: channel.feed
        }))
    }
}