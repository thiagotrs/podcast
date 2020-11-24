const app = require('./app')
const http = require('http')

const port = process.env.PORT || 4000

const server = http.createServer(app)

server.listen(port, () => `Listen on port ${port}`)