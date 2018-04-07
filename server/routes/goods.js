var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var User = require('../models/user');
var Prices = require('../models/prices');
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

router.get('/list', (req, res, next) => {
    // 从客户端获取的数据，需要进行校检，比如page必须只能为正整数
    let page = parseInt(req.query.page, 10) || 1;
    let pageSize = parseInt(req.query.pageSize, 10) || 8;
    let sort = req.query.sort; // 1升序， -1为降序
    let sortParam = req.query.sortName || 'salePrice';
    let priceLevel = req.query.priceLevel ? (Prices[req.query.priceLevel] || 'all') : 'all';
    let startPrice = req.query.startPrice || 0;
    let endPrice = req.query.endPrice || 0; // 0表示不做限制

    let skip = (page-1)*pageSize;
    let params = {
        
    };
    // 先处理价格区间
    if(priceLevel === 'all'){
        
    }else{
        params.salePrice = {
            "$gt": parseFloat(priceLevel.startPrice, 10),
            "$lte": parseFloat(priceLevel.endPrice, 10)
        };
    }

    // 可以利用总数据集进行条件筛选
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    if(sort){
        // 当有传sort参数时，才进行排序，否则按存储顺序读取
        goodsModel.sort({[sortParam] : parseInt(sort, 10)});
    }

    goodsModel.exec((err, doc) => {
        if(err){
            res.json({
                status: "1",
                msg: err.message
            })
        }else{
            res.json({
                status: "0",
                msg:'',
                result:{
                    count: doc.length,
                    list: doc
                }
            })
        }
    })

    /* Goods.find({}, (err, doc) => {
        if(err){
            res.json({
                status: "1",
                msg: err.message
            })
        }else{
            res.json({
                status: "0",
                msg:'',
                result:{
                    count: doc.length,
                    list: doc
                }
            })
        }
    }) */
});

router.post('/addCart', (req, res, next) => {
    let session = req.session;

    let userId = session.user.userId;
    let productId = req.body.productId;

    let addCartAction = User.findOne({userId}).exec();

    addCartAction.then((userDoc) => {
        if(userDoc){
            // 判断用户购物车商品数量是否超出限制
            if(userDoc.cartList.length >= Limit.cart.MAX_CART_NUM){
                res.json({
                    'status': '1',
                    'msg': Message.cart.error.ADDCART_MAX_NUM,
                    'result': ''
                });
            } else {
                Goods.findOne({productId}).exec().then((productDoc) => {
                    if(productDoc){
                        if(productDoc.stock > 0){
                            let goodsItem = '';
                            //如果在已有的购物车里找到这个产品。则可以减去一次查询验证pid
                            userDoc.cartList.forEach((item, index) => {
                                if(item.productId === productId){
                                    item.productNum++;
                                    goodsItem = item;
                                }
                            });
    
                            if(!goodsItem){
                                productDoc.productNum = 1;
                                productDoc.checked = 1;
                                userDoc.cartList.push(productDoc);
                            }
    
                            
                            userDoc.save().then(()=>{
                                res.json({
                                    status: "0",
                                    msg: '',
                                    result: '添加成功'
                                });
                            }, (err3) => {
                                res.json({
                                    status: "1",
                                    msg: err3.message
                                });
                            });
                        } else {
                            res.json({
                                'status': '1',
                                'msg': '库存不足',
                                'result': ''
                            })
                        }
                    }
                }, (err2) => {
                    res.json({
                        status: "1",
                        msg: err2.message
                    });
                });
            }
            
        }
    }, (err) => {
        res.json({
            status: "1",
            msg: err.message
        });
    });

    /* User.findOne({
        userId
    }, (err, userDoc) => {
        if(err){
            res.json({
                status: "1",
                msg: err.message
            });
        } else {
            if(userDoc){
                Goods.findOne({productId}, (err2, productDoc) => {
                    if(err2){
                        res.json({
                            status: "1",
                            msg: err2.message
                        });
                    } else {
                        if(productDoc){
                            if(productDoc.stock > 0){
                                let goodsItem = '';
                                //如果在已有的购物车里找到这个产品。则可以减去一次查询验证pid
                                userDoc.cartList.forEach((item, index) => {
                                    if(item.productId === productId){
                                        item.productNum++;
                                        goodsItem = item;
                                    }
                                });

                                if(!goodsItem){
                                    productDoc.productNum = 1;
                                    productDoc.checked = 1;
                                    userDoc.cartList.push(productDoc);
                                }

                                
                                userDoc.save((err3, addDoc) => {
                                    if(err3){
                                        res.json({
                                            status: "1",
                                            msg: err3.message
                                        });
                                    } else {
                                        res.json({
                                            status: "0",
                                            msg: '',
                                            info: addDoc,
                                            result: '添加成功'
                                        });
                                    }
                                });
                            } else {
                                res.json({
                                    'status': '1',
                                    'msg': '库存不足',
                                    'result': ''
                                })
                            }
                            
                        }
                    }
                });     
            }
        }
    }); */
});
// 服务器端渲染页面
router.get('/product/:pid', (req, res, next) => {
    let pid = req.params.pid;
    if(/^\d+$/.test(pid)){
        Goods.findOne({
            'productId': pid
        }, (err, doc) => {
            if(err){
                res.render('product', {
                    'title': '错误的产品ID',
                    'error': pid + ' : ' + err.message
                });
            } else {
                if(doc){
                    res.render('product', {
                        'error': '',
                        'title': doc.productName,
                        'product': {
                            'name': doc.productName,
                            'price': doc.salePrice,
                            'image': doc.productImage
                        }
                    });
                } else {
                    res.render('product', {
                        'title': '无此产品ID',
                        'error': pid
                    });
                }
            }
        });
        
    } else {
        res.render('product', {
            'title': '错误的产品ID',
            'error': pid
        });
    }
});
// 对组件请求的内容
router.get('/detail/:pid', (req, res, next) => {
    let pid = req.params.pid;
    // 对pid进行一些特殊规则的限制，有助于提前校检，避免数据库被大量无效请求干扰
    if(/^\d+$/.test(pid)){
        Goods.findOne({
            'productId': pid
        }, (err, doc) => {
            if(err){
                res.json({
                    'status': '1',
                    'msg': pid + ' : ' + err.message,
                    'result': ''
                });
            } else {
                if(doc){
                    res.json({
                        'status': '0',
                        'msg': '',
                        'result': {
                            'name': doc.productName,
                            'price': doc.salePrice,
                            'image': doc.productImage,
                            'stock': doc.stock
                        }
                    });
                } else {
                    res.json( {
                        'msg': '无此产品ID: ' + pid,
                        'status': '1',
                        'result': ''
                    });
                }
            }
        });
        
    } else {
        res.json({
            'msg': '错误的产品ID: ' + pic,
            'status': '1',
            'result': ''
        });
    }
});

module.exports = router;