var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var ejs = require('ejs');

var routes = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var prices = require('./routes/prices');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// https://ejs.bootcss.com/
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 初始化sesion
app.use(session({
  name: 'nanedo',
  secret: 'Nanedo',
  // store: new FileStore(),
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
     maxAge: 1000 * 60 * 10   // 有效期，单位是毫秒
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

// 拦截需登录接口
app.use((req, res, next) => {
  let session = req.session;
  if(session.user){
    next();
  } else {
    console.log('req path: ',req.path)
    if(/^\/((users\/(getCartCount|cartList|cartEdit|cartDel|addressList|setDefault|delAddress|addAddress|orderDetail|payMent))|(goods\/addCart))/.test(req.path)){
      res.json({
        'status': '2',
        'msg': '未登录',
        'result': ''
      });
    } else {
      next();
    }
    
  }
});

app.use('/', routes);
app.use('/users', users);
app.use('/goods', goods);
app.use('/prices', prices);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
