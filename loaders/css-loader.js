function loader(source) {
  console.log('css normal loader')
  // 匹配 url(xxx) 这个东西, 用 g 表示全局查找，因为 less 文件里不只是只有一个 url
  const reg = /url\((.+?)\)/g
  // 匹配的指针位置
  let pos = 0
  // 当前匹配的结果
  let current
  // 这个数组本质上就是保存一个代码段的
  const arr = ['let list = []']
  // 在 source 中循环匹配 reg
  while(current = reg.exec(source)) {
    // 匹配到了 ['url(./assets/demo.jpg)', './assets/demo.jpg']
    const [matchUrl, g] = current
    // ↓ lastPos 位置
    // url(./assets/demo.jpg)
    const lastPos = reg.lastIndex - matchUrl.length
    // 截取第一部分
    arr.push(`list.push(${JSON.stringify(source.slice(pos, lastPos))})`)

    // 指针移动
    // pos 位置             ↓
    // url(./assets/demo.jpg)
    pos = reg.lastIndex

    // 截取第二部分
    // 把 g 替换成 require 的写法
    // 即 './assets/demo.jpg' => require('./assets/demo.jpg')
    arr.push(`list.push('url(' + require('${g}') + ')')`)
  }

  // 截取第三部分
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)

  // 将整个 less 文件作为一个模块返回，而这个模块是一整个字符串
  // 当 style-loader require 引入时，里面的代码就可以直接执行了
  arr.push(`module.exports = list.join('')`)

  // 为了好看，每行代码之间增加一个回车
  return arr.join('\r\n')
}

module.exports = loader
