<template>
  <div>
    <my-dialog :mdShow="isShow" @close="hidePayDialog">
        <div class="paymenModal" slot="message" >
          <div class="form-check">
            <input class="form-check-input" name="payType" v-model="paymentType" type="radio" value="1" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              在线支付
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" name="payType" v-model="paymentType" type="radio" value="2" id="defaultCheck2">
            <label class="form-check-label" for="defaultCheck2">
              货到付款
            </label>
          </div>
        </div>
        <div class="btn btn-confirm" @click="confirmBuy">
            确认购买
          </div>
      </my-dialog>
      <my-dialog :mdShow="isShowErrDialog" @close="hideErrDialog">
        创建订单失败！<br />{{errInfo}}
      </my-dialog>
      <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
  </div>
</template>

<script>
import MyDialog from '@/components/base/Modal'
import CheckOrder from '@/components/checkOrder'
import BankChooser from '@/components/bankChooser'

export default {
  components: {
    MyDialog,
    CheckOrder,
    BankChooser
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    reqParams: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bankId: '',
      isShowCheckOrder: false,
      isShowErrDialog: false,
      orderId: '',
      errInfo: '',
      paymentType: '' // 选择线上支付
    }
  },
  filters: {
    makeHtml (value) {
      return value
    }
  },
  methods: {
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
    },
    hidePayDialog () {
      this.$emit('close')
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    confirmBuy () {
      this.$http.post('/api/users/createOrder', Object.assign({
        bankId: this.bankId,
        paymentType: this.paymentType
      }, this.reqParams))
        .then((res) => {
          if (res.data.status === '0') {
            this.orderId = res.data.result.orderId
            this.$emit('close')
            if (this.paymentType === '1') {
              this.$router.push({
                path: '/orderPayment',
                query: {
                  orderId: this.orderId
                }
              })
            } else {
              this.$router.push({
                path: '/orderSuccess',
                query: {
                  orderId: this.orderId
                }
              })
            }
          } else {
            this.errInfo = res.data.msg
            this.isShowErrDialog = true
          }
        }, (err) => {
          this.errInfo = err
          this.$emit('close')
          this.isShowErrDialog = true
        })
    }
  }
}
</script>

<style scoped>
.paymenModal{
  text-align: left;
}
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
