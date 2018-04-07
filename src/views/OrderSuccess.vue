<template>
  <div>
      <header-component></header-component>
      <nav-bread>Order Success</nav-bread>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：{{orderId}}</span>
              <span>Order total：{{orderTotal|currency('$')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/">Goods List</router-link>
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
        }).then((res)=>{
            let data = res.data
            if(data.status === '0'){
                this.orderId = orderId
                this.orderTotal = data.result.orderTotal
            } else if(data.status === '2'){
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
