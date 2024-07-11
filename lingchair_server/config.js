const io = require('./io')

// 生成默认配置
const CONFIG = io.open('config.json', 'rw').checkExistsOrWriteJson({
    http: {
        pathName: 'lingchair_http',
        https: {
            enable: false,
            key: '',
            cert: '',
        },
        port: 80,
        bindAddress: '',
    },
    data: {
        pathName: 'lingchair_data',
    },
}).readAllJsonAndClose()

module.exports = {
    lingchairConfig: CONFIG,
}
