const loaderUtils = require('loader-utils')

// 普通 loader
function loader(source) {
  console.log('style normal loader')
  const str = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `
  return str
}

// pitch 执行的顺序是 style-loader css-loader less-loader
// 这里 remainingRequest 剩余请求表示的就是 css-loader!less-loader!./index.less
// 也就是剩下的还没操作的 css-loader less-loader
loader.pitch = (remainingRequest) => {
  // 使用 stringifyRequest 的作用是
  // 将请求转换为可以在 require() 或 import 中使用的字符串，同时避免使用绝对路径
  const req = loaderUtils.stringifyRequest(this, '!!' + remainingRequest)
  const str = `
    let style = document.createElement('style')
    style.innerHTML = require(${req})
    document.head.appendChild(style)
  `
  return str
}

module.exports = loader