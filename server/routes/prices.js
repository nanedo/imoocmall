// 用来提供过滤价格的分段数据
let express = require('express');
let prices = require('../models/prices');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        status: '0',
        msg: '',
        list: prices
    });
});

module.exports = router;