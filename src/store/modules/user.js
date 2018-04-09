import Vue from 'vue'

const state = {
  nickName: '',
  cartCount: 0
}

const mutations = {
  updateUserInfo (state, nickName) {
    console.log(`commit user: ${nickName}`)
    state.nickName = nickName
  },
  updateCartCount (state, cartCount) {
    console.log(`commit cart: ${cartCount}`)
    state.cartCount = cartCount
  }
}
// 当需要对state数据进行操作处理时，可以使用这个（会缓存）
const getters = {
  getNickName: state => state.nickName,
  getCartCount: state => state.cartCount
}

const actions = {
  fetchCartCount ({ commit, state }) {
    Vue.axios.post('/api/users/getCartCount').then((res) => {
      if (res.data.status === '0') {
        commit('updateCartCount', res.data.result.cartCount)
      } else {

      }
    }, err => console.log(`check error: ${err}`))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
