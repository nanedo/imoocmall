const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./mock/db.json')
const middlewares = jsonServer.defaults()

// 引入router配置文档
// const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json')));
// server.use(jsonServer.rewriter(routes))

// https://www.jianshu.com/p/11d04a4c22af 中文文档

const lowdb = require('lowdb') // 用来操作json文件

// https://github.com/typicode/json-server#add-routes


// 路由规则要在 server.use(router)之前添加
/* server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
  })) */

server.use(middlewares)

// https://github.com/zq99299/rest-api-mock-server
// 可以参考这个来写


/* server.get('/the-same-url', function(req, res) {
    if(req.param.param == "one")
      res.json({test: 1});
    else if(req.param.param == "two")
      res.json({test2: 12});
  }) */

// https://github.com/typicode/json-server/issues/453
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
/* server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
}) */

// express操作cookie
// https://segmentfault.com/a/1190000004139342?_ea=504710

server.use(jsonServer.bodyParser)
server.get('/logout', (req, res, next) => {
    res.clearCookie('username')
    res.json({
        status: 'success',
        username: ''
    })
})
server.post('/login', (req, res, next) => {
    if(req.body.username === "abc@123.com" && req.body.password === '123456'){
        res.cookie('username', req.body.username, { httpOnly: false })
        res.json({
            status: 'success',
            username: req.body.username,
            msg: '登录成功'
        })
    } else {
        res.json({
            status: 'fail',
            msg: '登录失败，错误的用户名或者密码~',
            param: req.body.username+' : '+req.body.password + ' : '+JSON.stringify(req.body)
        })
    }
    //next()
})
server.post('/getPrice', (req, res, next) => {
    res.json({
        amount: 10
    })
})
server.post('/createOrder', (req, res, next) => {
    res.json({
        orderId: 'asada12'
    })
})
server.post('/checkOrder', (req, res, next) => {
    if(Math.random() > 0.5){
        res.json({
            status: 'success'
        })
    } else {
       // res.sendStatus(401)
       res.status(500).json({
           status: 'fail',
           msg: '支付失败，未知请求'
       })
    }
    
})


server.use(router)
// server.use('/api', router)

server.listen(8091, () => {
    console.log('JSON server is running~')
})