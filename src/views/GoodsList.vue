<template>
  <div>
      <header-component></header-component>
      <nav-bread>Goods</nav-bread>
      <div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default" @click="sortGoods('default')" :class="{cur: !isSortPrice}">Default</a>
      <a href="javascript:void(0)" :class="{'sort-up': sortFlag, cur: isSortPrice}" @click="sortGoods()" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" :class="{cur: 'all' ===priceChecked}" @click="setPriceFilter('all')">All</a></dd>
          <dd v-for="(item, index) in priceFilter" :key="index">
            <a href="javascript:void(0)" :class="{cur: index===priceChecked}" @click="setPriceFilter(index)">{{ item.startPrice }} - {{ item.endPrice }}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item, index) in goodsList" :key="index">
              <div class="pic">
                  <!-- 请求后台的静态页面
                <a :href="'/api/goods/product/'+item.productId" target="_blank"><img v-lazy="'/static/' + item.productImage" alt=""></a> -->
                <!-- 前端渲染页面 -->
                <a :href="'/goods/'+item.productId" target="_blank"><img v-lazy="'/static/' + item.productImage" alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{ item.productName }}</div>
                <div class="price">{{  item.salePrice }}</div>
                <AddCartButton :productId="item.productId" :stock="item.stock" :key="item.productId"></AddCartButton>
              </div>
            </li>
          </ul>
        </div>
        <div class="view-more-normal"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="20">
        <img src="/static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
        </div>
      </div>
    </div>
  </div>
</div>
<div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <footer-component />
  </div>
</template>
<script>
import HeaderComponent from '../components/header'
import FooterComponent from '../components/footer'
import NavBread from '../components/NavBread'
import Modal from '../components/base/Modal'
import AddCartButton from '../components/AddCartButton'

import {eventBus} from '../eventBus'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    NavBread,
    Modal,
    AddCartButton
  },
  data () {
    return {
      page: 1,
      pageSize: 8,
      busy: true,
      loading: false,
      mdShow: false,
      mdShowCart: false,
      goodsList: [],
      priceFilter: [],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false,
      sortFlag: false,
      isSortPrice: false
    }
  },
  mounted () {
    this.getPriceList()
    this.getGoodList()
  },
  methods: {
    getPriceList () {
      this.$http.get('/api/prices').then((res) => {
        if (res.data.status === '0') {
          this.priceFilter = res.data.list
        }
      }, (err) => {
        eventBus.$emit('showMsg', `get prices error: ${err}`)
      })
    },
    getGoodList () {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        priceLevel: this.priceChecked
      }
      if (this.isSortPrice) {
        param.sort = this.sortFlag ? 1 : -1
      }
      this.loading = true
      this.$http.get('/api/goods/list', {params: param}).then((res) => {
        this.loading = false
        if (res.data.status === '0') {
          if (res.data.result.count) {
            this.busy = res.data.result.count < this.pageSize
            if (this.page === 1) {
              this.goodsList = res.data.result.list
            } else {
              this.goodsList = this.goodsList.concat(res.data.result.list)
            }
          } else {
            this.busy = true
          }
        } else {
          this.goodsList = []
        }
      }, (err) => {
        eventBus.$emit('showMsg', `get goods error: ${err}`)
      })
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodList()
      }, 500)
    },
    setPriceFilter (type) {
      this.priceChecked = type
      this.closePop()
      this.page = 1
      this.getGoodList()
    },
    sortGoods (flag) {
      if (flag) {
        this.isSortPrice = false
      } else {
        this.isSortPrice = true
        this.sortFlag = !this.sortFlag
      }
      this.page = 1
      this.getGoodList()
    },
    addCart (productId) {
      // 直接请求后台，如果返回未登录状态则调用登录框
      this.$http.post('/api/goods/addCart', {
        productId
      }).then((res) => {
        let data = res.data
        if (data.status === '0') {
          // 添加成功
          eventBus.$emit('showMsg', '添加成功')
          this.$store.dispatch('fetchCartCount')
        } else if (data.status === '2') {
          // 未登录状态，弹出登录框
          eventBus.$emit('unLogin', () => {
            this.addCart(productId)
          })
          // 如果需要在弹出登录框后，用户登录成功了，再次执行添加到购物车的操作，则需要传递一个回调给登录框
        } else {
          // 报错
          eventBus.$emit('showMsg', `addCart res: ${res.data.info}`)
        }
      }, (err) => {
        eventBus.$emit('showMsg', `${productId} add Cart error:  ${err}`)
      })
    },
    showFilterPop () {
      this.overLayFlag = true
      this.filterBy = true
    },
    closePop () {
      this.overLayFlag = false
      this.filterBy = false
    }
  }
}
</script>
<style>

</style>
