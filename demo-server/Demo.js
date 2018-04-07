let user = require('./User')
let http = require('http')
let url = require('url')
let util = require('util')
let path = require('path')

console.log(`userName: ${user.sayHello() + ', ' + user.userName}`)

let ser = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    console.log(`url2: ${req.url}`)
    res.end(util.inspect(url.parse(req.url)))
})

ser.listen(3001, '127.0.0.1', () => {
    console.log('服务器已经运行，请输入 http://127.0.0.1:3001')
})