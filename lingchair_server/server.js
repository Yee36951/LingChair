const express = require('express')
const http = require('node:http')
const https = require('node:https')
const io = require('./io')
const socketIo = require('socket.io')

const { lingchairConfig } = require('./config')

const app = express()

app.use('/', express.static(io.mkdirs(lingchairConfig.http.pathName)))

/** @type { http.Server } */
let httpServer
if (lingchairConfig.http.https.enable)
    httpServer = https.createServer({
        key: io.open(lingchairConfig.http.https.key, 'r').readAllAndClose(),
        cert: io.open(lingchairConfig.http.https.cert, 'r').readAllAndClose(),
    }, app)
else
    httpServer = http.createServer(app)

const socketIoServer = new socketIo.Server(httpServer, {

})

module.exports = function() {
    httpServer.listen(lingchairConfig.http.port, lingchairConfig.http.bindAddress == '' ? null : lingchairConfig.http.bindAddress)
}
