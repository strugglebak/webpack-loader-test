const loaderUtils = require('loader-utils')
const mime = require('mime')
function loader(source) {
  const { limit } = loaderUtils.getOptions(this)
  if (limit && source.length < limit) {
    // 图片没有超过设定的限制大小就返回 base64 
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else {
    // 图片超过了就调用 file-loader 返回图片本身路径
    return require('./file-loader').call(this, source)
  }
}
// 让 source 变成二进制的 buffer
loader.raw = true 
module.exports = loader