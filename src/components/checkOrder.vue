<template>
    <div>
        <this-dialog :is-show="isShowCheckDialog" @on-close="checkStatus">
            请检查你的支付状态！
            <div class="button" @click="checkStatus">支付成功</div>
            <div class="button" @click="checkStatus">支付失败</div>
        </this-dialog>
        <this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
            购买成功！
        </this-dialog>
        <this-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
            购买失败！
        </this-dialog>
    </div>
</template>
<script>
import Dialog from './base/Modal'

export default {
  props: {
    'isShowCheckDialog': {
      type: Boolean,
      default: false
    },
    'orderId': {
      type: [String, Number]
    }
  },
  components: {
    thisDialog: Dialog
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  methods: {
    checkStatus () {
      this.$http.post('/api/checkOrder', {
        orderId: this.orderId
      }).then((res) => {
        this.isShowSuccessDialog = true
        this.$emit('on-close-check-dialog')
      }, (err) => {
        console.log(err)
        this.isShowFailDialog = true
        this.$emit('on-close-check-dialog')
      })
    },
    toOrderList () {
      // 关闭弹窗
      this.isShowSuccessDialog = false
      this.isShowFailDialog = false
      this.$router.push({path: '/orderList'})
    }
  }
}
</script>
<style scoped>

</style>
