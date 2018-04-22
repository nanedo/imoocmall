<template>
  <div class="btn-area">
        <a href="javascript:;" :class="{'btn--dis': isEmpty}" class="btn btn--m" @click="addCart" >加入购物车</a>
    </div>
</template>

<script>
import {eventBus} from '../eventBus'

export default {
  props: {
    'productId': {
      type: Number,
      required: true
    },
    'stock': {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isEmpty: false
    }
  },
  mounted () {
    this.initStatus()
  },
  methods: {
    initStatus () {
      // 判断是否有库存，或者其它一些活动
      if (this.stock < 1) {
        this.isEmpty = true
      }
    },
    addCart () {
      // 直接请求后台，如果返回未登录状态则调用登录框
      this.$http.post('/api/goods/addCart', {
        productId: this.productId
      }).then((res) => {
        let data = res.data
        if (data.status === '0') {
          // 添加成功
          eventBus.$emit('showMsg', '添加成功')
          this.$store.dispatch('fetchCartCount')
        } else if (data.status === '2') {
          // 未登录状态，弹出登录框，绑定弹出登陆框后的登录成功回调
          eventBus.$emit('unLogin', () => {
            this.addCart(this.productId)
          })
          // 如果需要在弹出登录框后，用户登录成功了，再次执行添加到购物车的操作，则需要传递一个回调给登录框
        } else {
          // 报错
          eventBus.$emit('showMsg', `${res.data.msg}`)
        }
      }, (err) => {
        eventBus.$emit('showMsg', `${this.productId} add Cart error:  ${err}`)
      })
    }
  }
}
</script>
