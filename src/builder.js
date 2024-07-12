const compiler = require('./compiler')
const io = require('./io')
const { lingChairConfig, lingchairConfig } = require('./config')
const logger = require('./logger')

io.copyDir('./src/page', lingchairConfig.http.pathName)

compiler(lingchairConfig.http.pathName)

logger.info('任务已开始!')

process.on('exit', function() {
    logger.info('任务完毕!')
})
