module.exports = {
    renderOne(channel) {
        return {
            id: channel.id,
            title: channel.title,
            description: channel.description,
            link: channel.link,
            image: channel.image,
            feed: channel.feed,
            items: channel.items.map(item => {
                return {
                    title: item.title,
                    description: item.description,
                    link: item.link,
                    enclosure: {
                        url: item.enclosure.url,
                        duration: item.enclosure.duration
                    },
                    image: item.image
                }
            })
        }
    }
}