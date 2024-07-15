const child_process = require('node:child_process')
const logger = require('./src/logger')
const io = require('./src/io')
const { lingChairConfig } = require('./src/config')

function fork(a) {
    let c = child_process.fork(a, {
        silent: true
    })
    c.stdout.setEncoding('utf8')
    c.stdout.on('data', function (data) {
        console.log(data.toString().trim())
    })
    return c
}

if (process.argv.includes("--build"))
    fork('./src/builder.js').once('exit', (code) => {
        if (code != 0) {
            logger.error(`构建网页失败! 请查看日志寻找原因, 若多次无法解决请寻找他人解决`)
            process.exit(1)
        }
        fork('./src/starter.js')
    })
else
    fork('./src/starter.js')
