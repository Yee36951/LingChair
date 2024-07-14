const express = require('express')
const http = require('node:http')
const https = require('node:https')
const io = require('./io')
const socketIo = require('socket.io')
const logger = require('./logger')

const { lingChairConfig } = require('./config')

logger.info(`正在初始化环境...`)

const app = express()

app.use('/', express.static(io.mkdirs(lingChairConfig.http.pathName)))

logger.info(`HTTP 静态文件目录: ${lingChairConfig.http.pathName}`)

/** @type { http.Server } */
let httpServer
if (lingChairConfig.http.https.enable)
    httpServer = https.createServer({
        key: io.open(lingChairConfig.http.https.key, 'r').readAllAndClose(),
        cert: io.open(lingChairConfig.http.https.cert, 'r').readAllAndClose(),
    }, app)
else
    httpServer = http.createServer(app)

const socketIoServer = new socketIo.Server(httpServer, {

})

module.exports = function () {
    httpServer.listen(lingChairConfig.http.port, lingChairConfig.http.bindAddress == '' ? null : lingChairConfig.http.bindAddress)
    logger.info(`服务已运行! 端口: ${lingChairConfig.http.port}, ${lingChairConfig.http.https.enable ? "已" : "未"}使用 HTTPS`)
}
