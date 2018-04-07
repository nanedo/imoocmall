// 将提示语统一管理，方便构建多语言切换功能
/*
格式
一级路由：{
    错误提示：{
        二三之后的路由： 错误信息
    }，
    成功提示： {

    }
}
*/
const Limit = require('./LIMIT');

module.exports = {
    global: {
        error: {
            'REGISTER_ONEDAY_NUM': '每天只能创建' + Limit.global.MAX_ONEDAY_REGISITER + '个用户',
            'NO_LOGIN': '用户未登陆'
        }
    },
    users: {
        error: {
            'PAYMENT_MAX_NUM': '最多创建'+Limit.users.MAX_ORDER_NUM+'个订单',
            'ADDRESS_MAX_NUM': '最多创建'+Limit.users.MAX_ADDRESS_NUM+'个地址',
            'PAYMENT_CREATE_GOODS_ERROR': '您的购物车里没有需要结账的物品',
            'PAYMENT_CREATE_ADDRESS_ERROR': '您的地址信息有误'
        }
    },
    cart: {
        error: {
            'ADDCART_MAX_NUM':'购物车最多能放'+Limit.cart.MAX_CART_NUM+'件商品'
        },
        success: {

        }
    },
    goods: {

    }
};