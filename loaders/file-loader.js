const loaderUtils = require('loader-utils')
function loader(source) {
  // 根据 loaderContext 生成文件, 这个文件是一串 hash + .jpg 作为后缀名的
  const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
    content: source
  })
  // 发射文件
  this.emitFile(filename, source)
  // 最后 file-loader 需要返回一个路径，这样 index.js 在 import 图片的时候
  // img 的 src 才是正确的路径
  return `module.exports = "${filename}"`
}
// 让 source 变成二进制的 buffer
loader.raw = true 
module.exports = loader