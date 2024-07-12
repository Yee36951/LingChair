const compiler = require('./compiler')
const io = require('./io')
const { lingChairConfig } = require('./config')
const logger = require('./logger')

io.copyDir('./src/page', lingChairConfig.http.pathName)

compiler(lingChairConfig.http.pathName)

logger.info('任务已开始!')

process.on('exit', function() {
    logger.info('任务完毕!')
})
