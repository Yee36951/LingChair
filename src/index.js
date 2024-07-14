const child_process = require('node:child_process')
const logger = require('./logger')
const io = require('./io')
const { lingChairConfig } = require('./config')

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

console.log(process.execArgv)
if (process.execArgv.length != 0 && process.execArgv[0] == "--build")
    fork('./src/builder.js').once('exit', (code) => {
        if (code != 0) {
            logger.error(`构建网页失败! 请查看日志寻找原因, 若多次无法解决请寻找他人解决`)
            process.exit(1)
            return
        }
        fork('./src/starter.js')
    })
else
    fork('./src/starter.js')
