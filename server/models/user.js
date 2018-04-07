var mongoose = require('mongoose');
// 可以加上validation保证数据完整性
var userSchema = new mongoose.Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList":[
      {
        "productId":String,
        "productName":String,
        "salePrice":Number,
        "productImage":String,
        "checked":String,
        "productNum":Number
      }
    ],
    "addressList":[
      {
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
      }
    ]
});

module.exports = mongoose.model('User', userSchema, 'users');