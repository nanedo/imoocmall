<template>
  <div>
      <header-component></header-component>
      <nav-bread>商品详情</nav-bread>
      <div class="accessory-result-page accessory-page container">
        <div class="container product-detail">
          <div class="row mt-5">
            <div class="col-md-6 text-center product-image">
              <div v-for="(item, index) in productDetail.subImages" :key="index" class="pre-image">
                <img :src="item" alt="" class="pre-img" @click="currentIndex=index" :class="{'current': index===currentIndex}">
              </div>
              <img class="img-thumbnail rounded" :src="productDetail.image" alt="" />
            </div>
            <div class="col-md-6">
              <h1>{{ ptitle }}</h1>
              <p class="mt-5 alert alert-warning">
                {{ productDetail.subtitle }}
              </p>
              <p class="status">
                {{productDetail.status === 2 ? "已下架" : ""}}
              </p>
              <div class="mt-5">
                价格： {{productDetail.price|currency}}
              </div>
              <AddCartButton class="mt-5" :productId="productId" :stock="productDetail.stock"></AddCartButton>
            </div>
          </div>
          <div class="row border-top mt-3 pt-3 ">
            <div class="col-md-12 text-center" v-html="productDetail.detail">

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
      productId: 0,
      pidInfo: [],
      productDetail: {},
      stock: 0,
      currentIndex: 0
    }
  },
  mounted () {
    this.getProductInfo()
  },
  methods: {
    getProductInfo () {
      let pid = this.$route.params.pid
      this.productId = parseInt(pid, 10)
      this.$http.get('/api/goods/detail/' + pid).then((res) => {
        let data = res.data
        if (data.status === '0') {
          this.ptitle = data.result.name
          this.stock = data.result.stock
          this.productDetail = data.result
          this.productDetail.subImages = data.result.sub_images.split(',')
          this.pidInfo.push(data.result)
        } else {
          eventBus.$emit('showMsg', data.msg)
        }
      }, err => eventBus.$emit(`pid err: ${err}`))
    }
  }
}
</script>
<style>
.product-detail img{
  max-width: 100%;
  max-height: 500px;
}
.product-image{
  position: relative;
}
.product-image img{
  max-width: 100%;
  max-height: 100%;
}
.pre-image {
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
.pre-image img{
  margin-bottom: 5px;
  display: block;
  border: 1px solid #eee;
  padding: 3px;
}
.pre-image .current{
  border-color: #f00;
}
</style>
