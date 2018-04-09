// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import store from './store'
import {currency} from './util/currency'
import {eventBus} from './eventBus'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

Vue.config.productionTip = false

// 请求配置拦截
let axiosInstance = axios.create()
axiosInstance.interceptors.response.use((res) => {
  // let data = res.data
  // 不同接口的未登录状态需要不同的处理方式，怎么统一处理，差异化使用？
  /*  if(data.status === '2'){

    console.log('interceptors: 1')
    eventBus.$emit('unLogin')
  } */
  return res
}, (err) => eventBus.$emit('showMsg', err))

// 插件
Vue.use(VueAxios, axiosInstance)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  loading: '/static/loading-svg/loading-bars.svg',
  attempt: 3
})
// 过滤器
Vue.filter('currency', currency)
// 自定义指令
Vue.directive('focus', {
  inserted (el) {
    // console.log('inserted')
    // el.focus()
  },
  update (el) {
    // console.log('update:', el)
    // 如果input元素未可见，调用此方法无效，可以考虑延时调用
    /* setTimeout(() => {
      el.focus()
    },500) */
  },
  bind (el) {
    // console.log('bind', el)
    // 当元素在slot中，在父组件初始化时触发了
    // el.focus()
  },
  componentUpdated (el) {
    // console.log('componentUpdated')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

/* new Vue({
  el: '#app',
  router,
  render: h => h(App)
}) */

/* new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app') */
