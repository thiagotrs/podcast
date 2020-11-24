const Parser = require('rss-parser')
const parser = new Parser()

module.exports = {
    async getFeedItemsDetails(feed) {
        return await parser.parseURL(feed)
            .then(result => {
                return result.items.map(item => ({
                    title: item.itunes?.title || item.title,
                    description: item.itunes?.description || item.description,
                    link: item.itunes?.link || item.link,
                    enclosure: {
                        url: item.itunes?.enclosure?.url || item.enclosure?.url,
                        duration: item.itunes?.duration
                    },
                    image: item.itunes?.image || item.image
                }))
            })
    }
}