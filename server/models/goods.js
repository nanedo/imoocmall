var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 创建表结构
var productSchema = new Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "checked":String,
    "productNum":Number,
    "productImage":String,
    "stock": Number
})

module.exports = mongoose.model('Good', productSchema);