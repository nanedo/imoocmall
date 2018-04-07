let user = require('./User')
let http = require('http')
let url = require('url')
let util = require('util')
let path = require('path')
let fs = require('fs')

console.log(`userName: ${user.sayHello() + ', ' + user.userName}`)

let ser = http.createServer((req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    console.log(`url2: ${req.url}`)
    let pathname = url.parse(req.url).pathname
    fs.readFile(pathname.substring(1), (err, data)=>{
        if(err){
            console.log(`request error(${ pathname }): `, `${ err }`)
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            res.write(data.toString())
        }
        res.end()
    })
    
    // res.end(util.inspect(url.parse(req.url)))
})

ser.listen(3001, '127.0.0.1', () => {
    console.log('服务器已经运行，请输入 http://127.0.0.1:3002')
})