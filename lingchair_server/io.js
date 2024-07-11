const fs = require('node:fs')

/**
 * 简单文件类
 */
class IoImpl {
    /**
     * 构建函数
     * @param { String } path 
     * @param { String } mode 
     */
    constructor(path, mode) {
        this.path = path
        this.r = mode.includes('r')
        this.w = mode.includes('w')
    }
    /**
     * 构建函数
     * @param { String } path 
     * @param { String } mode 
     */
    static open(path, mode) {
        if (!mode || mode == '')
             throw new Error('当前文件对象未设置属性!')
        return new IoImpl(path, mode)
    }
    /**
     * 检测文件或目录是否存在
     * @param { String } path 
     * @returns { Boolean }
     */
    static exists(path) {
        return fs.existsSync(path)
    }
    /**
     * 创建文件夹, 有则忽略
     * @param { String } path 
     * @returns { String } path
     */
    static mkdirs(path) {
        if (!this.exists(path))
            fs.mkdirSync(path, { recursive: true })
        return path
    }
    /**
     * 检查文件是否存在, 若无则写入, 有则忽略
     * @param { Buffer || String } 写入数据
     * @returns { IoImpl } 对象自身
     */
    checkExistsOrWrite(data) {
        if (!IoImpl.exist(this.path))
            this.writeAll(data)
        return this
    }
    /**
     * 检查文件是否存在, 若无则写入 JSON 数据, 有则忽略
     * @param { Object } 写入数据
     * @returns { IoImpl } 对象自身
     */
    checkExistsOrWriteJson(data) {
        if (!fs.existsSync(this.path))
            this.writeAllJson(data)
        return this
    }
    /**
     * 读取一个文件
     * @returns { Buffer } 文件数据字节
     */
    readAll() {
        if (this.r)
            return fs.readFileSync(this.path)
        throw new Error('当前文件对象未设置可读')
    }
    /**
     * 读取一个文件并关闭
     * @returns { Buffer } 文件数据
     */
    readAllAndClose() {
        let r
        if (this.r)
            r = this.readAll()
        else 
            throw new Error('当前文件对象未设置可读!')
        this.close()
        return r
    }
    /**
     * 写入一个文件
     * @param { Buffer || String } 写入数据
     * @returns { IoImpl } 对象自身
     */
    writeAll(data) {
        if (this.w)
            fs.writeFileSync(this.path, data)
        else
            throw new Error('当前文件对象未设置可写!')
        return this
    }
    /**
     * 写入一个JSON文件
     * @param { Object } 写入数据
     * @returns { IoImpl } 对象自身
     */
    writeAllJson(data) {
        if (!data instanceof Object)
            throw new Error('你只能输入一个 JSON 对象!')
        if (this.w)
            this.writeAll(JSON.stringify(data))
        else
            throw new Error('当前文件对象未设置可写!')
        return this
    }
    /**
     * 读取一个JSON文件
     * @returns { Object } 文件数据
     */
    readAllJson() {
        if (this.r)
            return JSON.parse(this.readAll().toString())
        throw new Error('当前文件对象未设置可读!')
    }
    /**
     * 读取一个JSON文件并关闭
     * @returns { Object } 文件数据
     */
    readAllJsonAndClose() {
        let r
        if (this.r)
            r = JSON.parse(this.readAll().toString())
        else 
            throw new Error('当前文件对象未设置可读!')
        this.close()
        return r
    }
    /**
     * 回收文件对象
     */
    close() {
        delete this.path
        delete this.r
        delete this.w
    }
}

module.exports = IoImpl
