<template>
  <div>
      <header-component></header-component>
      <nav-bread>成功下单</nav-bread>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>已付款</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span> 收货地址</li>
            <li  class="cur"><span>查看</span> 订单</li>
            <li  class="cur"><span>在线</span> 支付</li>
            <li  class="cur"><span>订单</span> 详情</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>恭喜您! <br>您的订单正在处理中!</h3>
            <p>
              <span>订单号：{{orderId}}</span>
              <span>订单总价：{{orderTotal|currency('¥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">购物车</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/">更多商品</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer-component />
  </div>
</template>
<script>
import HeaderComponent from '../components/header'
import FooterComponent from '../components/footer'
import NavBread from '../components/NavBread'

import {eventBus} from '../eventBus'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    NavBread
  },
  data () {
    return {
      orderId: '',
      orderTotal: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let orderId = this.$route.query.orderId
      this.$http.post('/api/users/orderDetail', {
        orderId
      }).then((res) => {
        let data = res.data
        if (data.status === '0') {
          this.orderId = orderId
          this.orderTotal = data.result.orderTotal
        } else if (data.status === '2') {
          eventBus.$emit('unLogin', () => {
            this.init()
          }, {
            clickBgClose: false,
            hideClose: true
          })
        } else {
          eventBus.$emit('showMsg', data.msg)
        }
      }, err => eventBus.$emit('showMsg', err))
    }
  }
}
</script>
