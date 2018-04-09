<template>
  <div>
      <header-component></header-component>
      <nav-bread>商品详情</nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
            <h1>{{ ptitle }}</h1>
            <ul v-for="item in pidInfo" :key="item.names">
                <li v-for="(val, key) in item" :key="key">
                    <template v-if="key!='image'">
                        {{ key }} : {{ val }}
                    </template>
                    <template v-else>
                        <img :src="'/static/'+val" />
                    </template>

                </li>
                <li>
                    <AddCartButton :productId="productId" :stock="stock"></AddCartButton>
                </li>
            </ul>

        </div>
      </div>
      <footer-component />
  </div>
</template>
<script>
import HeaderComponent from '../components/header'
import FooterComponent from '../components/footer'
import NavBread from '../components/NavBread'
import AddCartButton from '../components/AddCartButton'

import {eventBus} from '../eventBus'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    NavBread,
    AddCartButton
  },
  data () {
    return {
      ptitle: '',
      productId: '',
      pidInfo: [],
      stock: 0
    }
  },
  mounted () {
    this.getProductInfo()
  },
  methods: {
    getProductInfo () {
      let pid = this.$route.params.pid
      this.productId = pid
      this.$http.get('/api/goods/detail/' + pid).then((res) => {
        let data = res.data
        if (data.status === '0') {
          this.ptitle = data.result.name
          this.stock = data.result.stock
          this.pidInfo.push(data.result)
        } else {
          eventBus.$emit('showMsg', data.msg)
        }
      }, err => eventBus.$emit(`pid err: ${err}`))
    }
  }
}
</script>
