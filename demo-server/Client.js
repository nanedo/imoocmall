let http = require('http')
let url = require('url')
let util = require('util')
let path = require('path')
let fs = require('fs')

http.get('http://www.duoyi.com/', (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data += chunk
    })
    res.on('end', () => {
        let result = data
        console.log(`result: \n ${result}`)
    })
})