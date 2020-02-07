console.log('hello world')

const str = require('./moduleA')

// const str = require('inline-loader!./moduleA.js')
// const str = require('-!inline-loader!./moduleA.js')
// const str = require('!inline-loader!./moduleA.js')
// const str = require('!!inline-loader!./moduleA.js')
// const str = require('inline-loader2!inline-loader!./moduleA.js')

// 测试 es6 语法
// class testClass {
//   constructor(name) {
//     this.name = name
//   }

//   getName() {
//     return this.name
//   }
// }

// console.log(new testClass('strugglebak').getName())


// 测试 file-loader 以及 url-loader
// import picture from './assets/demo.jpg'
// const img = document.createElement('img')
// img.src = picture
// document.body.appendChild(img)

// 测试 css 相关 loader
import './index.less'
