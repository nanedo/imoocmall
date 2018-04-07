var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Util = require('../models/Util');
var crypto = require('crypto');
// 配置文件
var Limit = require('../config/LIMIT');
var Message = require('../config/MESSAGE');

mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on('connected', () => {
    console.log('connected')
});

mongoose.connection.on('error', () => {
    console.log('error')
});

mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
});

/* GET users listing. */
/* router.post('/login', function(req, res, next) {
  // 先检查来源是否合法，如请求域名判断
  // 检查数据是否合法
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;
  
  // 这里只是简单检查，正常的检查应该还会有一大堆规则
  if(!userName || !userPwd){
    res.json({
        'status': '1',
        'msg': '用户名或者密码不正确'
    });
  } else {
      // 用户名可以跟密码一起查询的，没必要先查用户再判断密码
    User.findOne({
        userName,
        userPwd
    }, (err, doc) => {
        if(err){
            res.json({
                'status': '1',
                'msg': err.message
            });
        } else {
            if(doc){
                res.cookie('userId', doc.userId, {
                    path: '/',
                    maxAge: 1000*60*60
                });
                res.cookie('userName', doc.userName, {
                    path: '/',
                    maxAge: 1000*60*60
                });
                
                res.json({
                    'status': '0',
                    'msg': '',
                    'result': {
                        userName: doc.userName
                    }
                });
            } else {
                res.json({
                    'status': '1',
                    'msg': '用户名或者密码不正确3'
                });
            }
            
        }
    });
  } */
  //  改成用session处理
  router.post('/login', function(req, res, next) {
    // 先检查来源是否合法，如请求域名判断
    // 检查数据是否合法
    let userName = req.body.userName;
    let userPwd = req.body.userPwd;
    
    // 这里只是简单检查，正常的检查应该还会有一大堆规则
    if(!userName || !userPwd){
      res.json({
          'status': '1',
          'msg': '用户名或者密码不正确'
      });
    } else {
        // 用户名可以跟密码一起查询的，没必要先查用户再判断密码
      User.findOne({
          userName,
          userPwd
      }, (err, doc) => {
          if(err){
              res.json({
                  'status': '1',
                  'msg': err.message
              });
          } else {
              if(doc){
                  req.session.regenerate((err) => {
                      if(err){
                          res.json({
                              'status': '1',
                              'msg': '登录失败~',
                              'message': err.message
                          });
                      } else {
                          req.session.user = doc;
                          res.json({
                            'status': '0',
                            'msg': '登录成功',
                            'result': {
                                userName: doc.userName
                            }
                          });
                      }
                  });
                  
              } else {
                  res.json({
                      'status': '1',
                      'msg': '用户名或者密码不正确3'
                  });
              }
              
          }
      });
    }

  // 可以对用户密码先进行加密再跟数据库比对，这样有助于保证数据库的安全

  // res.send('respond with a resource');
});

// 注册
router.post('/register', function(req, res, next) {
    // 先检查来源是否合法，如请求域名判断
    // 检查数据是否合法
    let userName = req.body.userName;
    let userPwd = req.body.userPwd;
    
    // 这里只是简单检查，正常的检查应该还会有一大堆规则
    if(!userName || !userPwd){
      res.json({
          'status': '1',
          'msg': '用户名或者密码不正确'
      });
    } else {
        // 检查用户名是否被注册
      let hadUser = User.findOne({
          userName
      }).exec();
      let handleUtil = Util.findOne({}, {regisiter:1}).exec();

      Promise.all([hadUser, handleUtil]).then((valArr) => {
          let userDoc = valArr[0];
          let utilDoc = valArr[1];
          let today = +(new Date());
          let regDay = utilDoc.regisiter.regisiterDay;
          let regNum = utilDoc.regisiter.regisiterNum;

          if(userDoc){
            //  如果有，表示已被注册，返回错
            res.json({
              'status': '1',
              'msg': '该用户名已被注册~'
            });
          } else {
            // 判断是否在24小时内
            if((today - regDay) > 1000*60*60*24){
                // 判断是否已经设置过regisiterNum
                utilDoc.regisiter.regisiterNum = 0;
                utilDoc.regisiter.regisiterDay = today;
                utilDoc.save();
            } else if (regNum >= Limit.global.MAX_ONEDAY_REGISITER) {
                // 当超出当日最大注册数量时提示
                res.json({
                    'status': '1',
                    'msg': Message.global.error.REGISTER_ONEDAY_NUM,
                    'result': ''
                });
            } else {
                // 添加用户，并增加注册量
                let hash = crypto.createHmac('sha256', new Date() + Math.random()).digest('hex');
                let newUser = User.create({
                    userName,
                    userPwd,
                    userId: hash
                });
                utilDoc.regisiter.regisiterNum = regNum + 1;
                utilDoc.save();
                
                newUser.then((doc) => {
                    res.json({
                        'status': '0',
                        'msg': '注册成功',
                        'result': '注册成功'
                    });
                }, (err) => {
                    res.json({
                        'status': '1',
                        'msg': err.message
                    });
                });
            }
          }
          
          
      }, err => next(err));

      /* hadUser.then((doc) => {
        if(doc){
            //  如果有，表示已被注册，返回错
            res.json({
              'status': '1',
              'msg': '该用户名已被注册~'
            });
            
        } else {
            let hash = crypto.createHmac('sha256', new Date() + Math.random()).digest('hex');
            let newUser = User.create({
                userName,
                userPwd,
                userId: hash
            });
            
            newUser.then((doc) => {
                res.json({
                    'status': '0',
                    'msg': '注册成功',
                    'result': '注册成功'
                });
            }, (err) => {
                res.json({
                    'status': '1',
                    'msg': err.message
                });
            });
        }
      }, (err) => {
        res.json({
            'status': '1',
            'msg': err.message
        });
      }); */
      /* User.findOne({
          userName
      }, (err, doc) => {
          if(err){
              res.json({
                  'status': '1',
                  'msg': err.message
              });
          } else {
              if(doc){
                  //  如果有，表示已被注册，返回错
                  res.json({
                    'status': '1',
                    'msg': '该用户名已被注册~'
                  });
                  
              } else {
                  let hash = crypto.createHmac('sha256', new Date() + Math.random()).digest('hex');
                  User.create({
                      userName,
                      userPwd,
                      userId: hash
                  }, (err2, doc2) => {
                      if(err2){
                        res.json({
                            'status': '1',
                            'msg': err2.message
                        });
                      } else {
                        res.json({
                            'status': '0',
                            'msg': '注册成功',
                            'result': '注册成功'
                        });
                      }
                  });
              }
              
          }
      }); */
    }

  // 可以对用户密码先进行加密再跟数据库比对，这样有助于保证数据库的安全

  // res.send('respond with a resource');
});

router.post('/cartEdit', (req, res, next) => {
    let session = req.session;
    let cartList = req.body.cartList; // 需要对上传的数据进行严格的校检

    User.findOne({
        userId: session.user.userId
    }).exec().then((doc) => {
        if(doc && typeof cartList === 'object') {
            doc.cartList = cartList;
            doc.save((err2, doc2) => {
                if(err2){
                    res.json({
                        'status': '1',
                        'msg': err2.message
                    });
                } else if(doc2) {
                    res.json({
                        'status': '0',
                        'msg': '',
                        'result': ''
                    })
                }
            });
        }
    }, (err) => {
        res.json({
            'status': '1',
            'msg': err.message
        });
    });
});

router.post('/cartDel', (req, res, next) => {
    let session = req.session;
    let productId = req.productId;

    // $pull 被称为 原子操作
    // http://www.runoob.com/mongodb/mongodb-atomic-operations.html
    User.update({
        productId
    }, {
        '$pull': {
            'cartList': {
                productId
            }
        }
    }, (err, doc) => {
        if(err){
            res.json({
                'status': '1',
                'msg': err.message,
                'result': ''
            })
        } else {
            res.json({
                'status': '0',
                'msg': '获取成功',
                'result': ''
            });
        }
    })
});

router.post('/getCartCount', function(req, res, next) {
    let session = req.session;

    User.findOne({
        userId: session.user.userId
    }, (err, doc) => {
        if(err) {
            res.json({
                'status': '1',
                'msg': err.message
            })
        } else {
            if(doc){
                let count = 0;
                doc.cartList.map(item => count+= item.productNum);
                res.json({
                    'status': '0',
                    'msg': '获取成功',
                    'result': {
                        'cartCount': count
                    }
                });
            }
            
        }
    });

});

router.get('/cartList', (req, res, next) => {
    let session = req.session;

    User.findOne({
        userId: session.user.userId
    }, (err, doc) => {
        if(err) {
            res.json({
                'status': '1',
                'msg': err.message
            })
        } else {
            res.json({
                'status': '0',
                'msg': '获取成功',
                'result': doc.cartList
            })
        }
    });
});

// 确认订单
router.post('/payMent', (req, res, next) => {
    let session = req.session;
    let userId = session.user.userId;
    let addressId = req.body.addressId;
    let orderTotal = req.body.orderTotal;

    let hash = crypto.createHmac('sha256', new Date() + Math.random()).digest('hex');

    User.findOne({
        userId
    }).exec().then((doc) => {
        if(doc){
          let unPaymentArr = doc.orderList.filter((item) => {
              return item.orderStatus !== '1';
          });
          if(unPaymentArr.length >= Limit.users.MAX_ORDER_NUM){
                res.json({
                    'status': '1',
                    'msg': Message.users.error.PAYMENT_MAX_NUM,
                    'result': ''
                });
          } else {
            //获取此次的地址信息
            let addressInfo = doc.addressList.filter((item) => {
                return item.addressId === addressId;
            })[0];
            //获取用户购物车里被勾选的商品，并清除掉其在购物车里的记录
            let goodsList = doc.cartList.filter((item) => {
                return item.checked === '1';
            });
            //保留未勾选的商品
            doc.cartList = doc.cartList.filter((item) => {
                return item.checked !== '1';
            });
            if(!addressInfo){
                // 如果地址id不对，则进行提示，并禁止创建订单
                res.json({
                    'status': '1',
                    'msg': Message.users.error.PAYMENT_CREATE_ADDRESS_ERROR,
                    'result': ''
                });
            } else if(goodsList.length < 1){
                // 如果购物车里没有未勾选的商品，则不创建订单 
                res.json({
                    'status': '1',
                    'msg': Message.users.error.PAYMENT_CREATE_GOODS_ERROR,
                    'result': ''
                });
            } else {
                doc.orderList.push({
                    orderId: hash,
                    addressInfo,
                    orderTotal,
                    goodsList,
                    orderStatus: '0',
                    createDate: new Date()/* .Format('yyyy-MM-dd hh:mm:ss') */
                });
                doc.save().then(() => {
                    res.json({
                        'status': '0',
                        'msg': '成功创建订单',
                        'result': {
                            orderId: hash
                        }
                    });
                }, () => {
                    res.json({
                        'status': '1',
                        'msg': '创建订单失败',
                        'result': ''
                    });
                });  
            }
          }
        }
    }, err => next(err) );
});

//拿到订单信息
router.post('/orderDetail', (req, res, next) => {
    let session = req.session;
    let userId = session.user.userId;
    let orderId = req.body.orderId;

    User.findOne({
        userId
    }).exec().then((doc) => {
        if(doc){
            let order = doc.orderList.filter((item) => {
                return item.orderId === orderId;
            })[0];
            if(order){
                res.json({
                    'status': '0',
                    'msg': '',
                    'result': {
                        orderTotal: order.orderTotal
                    }
                });
            } else {
                res.json({
                    'status': '1',
                    'msg': '查无订单',
                    'result': ''
                });
            }
            
        } else {
            next()
        }
    }, err => next(err));
});

/* router.post('/logout', function(req, res, next) {
    res.cookie('userId', "", {
        path: "/",
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: ''
    });
}); */
// 改成用session处理
router.post('/logout', function(req, res, next) {
    req.session.destroy((err) => {
        if(err){
            res.json({
                'status': '1',
                'msg': err.message
            });
        } else {
            // 清除 cookie
            res.clearCookie('Nanedo');
            res.json({
                'status': '0',
                'msg': '退出登录'
            });
        }
    });
});

router.post('/checkLogin', function(req, res, next) {
    let session = req.session;
    if(session.user){
        res.json({
            'status': '0',
            'msg': '',
            'result': {
                userName: session.user.userName
            }
        });
    } else {
        res.json({
            'status': '2',
            'msg': '未登录'
        });
    }
});

//========================地址信息选哪个更===================
//查询地址信息
router.post('/addressList', (req, res, next) => {
    let session = req.session;
    let userId = session.user.userId;

    User.findOne({
        userId
    }).then((doc)=>{
        if(doc){
            res.json({
                'status': '0',
                'msg': '',
                'result': doc.addressList
            });
        }else{
            next();
        }
    }, (err) => {
        res.json({
            'status': '1',
            'msg': err.message,
            'result': ''
        });
    });
});

//设置默认地址信息
router.post('/setDefault', (req, res, next) => {
    let session = req.session;
    let userId = session.user.userId;
    let addressId = req.body.addressId;

    User.findOne({
        userId
    }).exec().then((doc) => {
        if(doc){
            let findInx = '';
            doc.addressList.forEach((el, inx) => {
                if(el.addressId === addressId){
                    findInx = inx;
                    return false;
                }
            });
            if(findInx!==''){
                doc.addressList.forEach((el) => {
                    el.isDefault = false;
                });
                doc.addressList[findInx].isDefault = true;
                doc.save().then(()=>{
                    res.json({
                        'status': '0',
                        'msg': '',
                        'result': ''
                    });
                }, err => next(err));
            }else{
                next();
            }
        }else{
            next();
        }
    }, err => next(err));
});

//删除地址信息
router.post('/delAddress', (req, res, next) => {
    let session = req.session;
    let userId = session.user.userId;
    let addressId = req.body.addressId;

    User.update({
        userId
    }, {
        $pull: {
            "addressList": {
                addressId
            }
        }
    }).then((doc) => {
        res.json({
            'status': '0',
            'msg': '删除成功',
            'result': ''
        });
    }, err => next(err));
});

//增加地址信息
router.post('/addAddress', (req, res, next) => {
    let session = req.session;
    let userId = session.user.userId;

    let userName = req.body.userName;
    let streetName = req.body.streetName;
    let postCode = req.body.postCode || '';
    let tel = req.body.tel;

    if(!userName||!streetName||!tel){
        res.json({
            'status': '1',
            'msg': '缺少必要的数据',
            'result': ''
        });
    } else {
        User.findOne({
            userId
        }).exec().then((doc) => {
            if(doc){
                if(doc.addressList.length >= Limit.users.MAX_ADDRESS_NUM){
                    res.json({
                        'status': '1',
                        'msg': Message.users.error.ADDRESS_MAX_NUM,
                        'result': ''
                    });
                } else {
                    doc.addressList.push({
                        addressId: +new Date(),
                        userName,
                        streetName,
                        postCode,
                        tel
                    });
                    doc.save().then(()=>{
                        res.json({
                            'status': '0',
                            'msg': '添加成功',
                            'result': ''
                        });
                    }, err => next(err));
                }
            } else {
                next(new Error('No found~'));
            }
        }, err => next(err));
        /* User.update({
            userId
        }, {
            $push: {
                "addressList": {
                    addressId: +new Date(),
                    userName,
                    streetName,
                    postCode,
                    tel
                }
            }
        }).then((doc) => {
            res.json({
                'status': '0',
                'msg': '添加成功',
                'result': ''
            });
        }, err => next(err)); */
    }

    
});
  

module.exports = router;
