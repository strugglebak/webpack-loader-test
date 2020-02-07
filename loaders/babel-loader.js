const babel = require('@babel/core')
const loaderUtils = require('loader-utils')

function loader(source) {
  // this 就是 loaderContext
  const options = loaderUtils.getOptions(this)
  // 异步返回需要用到 async 这个函数
  const cb = this.async()
  // babel 转化代码
  babel.transform(source, {
    ...options,
    sourceMaps: true, // 使用源码映射 生成 .js.map
    filename: this.resourcePath.split('/').pop() // 取出资源文件名
  }, (err, result) => {
    const { code, map } = result
    cb(err, code, map) // 返回 code 以及 map 文件
  })
}

module.exports = loader