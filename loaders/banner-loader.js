const fs = require('fs')
const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')

function loader(source) {
  // 若有缓存则优先用缓存
  this.cacheable && this.cacheable()

  const cb = this.async()
  const options = loaderUtils.getOptions(this)
  const schema = {
    type: 'object',
    properties: {
      text: { type: 'string' },
      filename: { type: 'string' }
    }
  }

  // 验证配置有没有写正确
  validateOptions(schema, options, 'banner-loader')

  const { filename, text } = options
  if (filename) {
    // 添加依赖 在 webpack 使用 watch 配置时使用，只要对应文件有改动，会自动打包更新
    this.addDependency(filename)

    // 读取文件并写入注释
    fs.readFile(filename, 'utf8', (err, data) => {
      cb(err, `/**${data}*/${source}`)
    })
  } else {
    cb(null, `/**${text}*/${source}`)
  }
}

module.exports = loader