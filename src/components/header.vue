<template>
  <header class="header">
  <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="icon-arrow-short" viewBox="0 0 25 32">
            <title>arrow-short</title>
            <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
          </symbol>
          <symbol id="icon-status-ok" viewBox="0 0 32 32">
            <title>status-ok</title>
            <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
            <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
          </symbol>
          <symbol id="icon-cart" viewBox="0 0 38 32">
            <title>cart</title>
            <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
            <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
            <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
            <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          </symbol>
        </defs>
      </svg>
  <div class="navbar">
    <div class="navbar-left-container">
      <a href="/">
        <img class="navbar-brand-logo" src="/static/logo.jpg"></a>
    </div>
    <div class="navbar-right-container" style="display: flex;">
      <div class="navbar-menu-container">
        <iframe src="https://ghbtns.com/github-btn.html?user=nanedo&repo=imoocmall&type=watch&count=false&size=large" frameborder="0" scrolling="0" width="100px" height="30px"></iframe>
        <a href="#" class="navbar-link" v-if="nickName">{{ nickName }} 的账户</a>
        <span class="navbar-link"></span>
        <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="loginModalFlag=true">登录</a>
        <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="registerModalFlag=true">注册</a>
        <a href="javascript:void(0)" class="navbar-link" v-if="nickName" @click.stop="logOut">退出</a>
        <div class="navbar-cart-container">
          <span class="navbar-cart-count" v-if="cartCount">{{ cartCount }}</span>
          <a class="navbar-link navbar-cart-link" href="/cart">
            <svg class="navbar-cart-logo">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  <Modal :mdShow="loginModalFlag" @close="closeLoginModal" mdTitle="登 录" :hideClose="hideClose" :clickBgClose="clickBgClose">
      <template slot="message">
          <div class="error-wrap">
                <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
                <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="请输入用户名" data-type="loginname" v-focus>
                </li>
                <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="login">
                </li>
            </ul>
      </template>
      <a href="javascript:;" class="btn-login" @click="login" slot="btnGroup">登  录</a>
  </Modal>
  <modal :mdShow="msgModalFlag" @close="closeMsgModal">
    <div slot="message">{{ msg }}</div>
    <div slot="btnGroup">
        <a class="btn btn--m btn--red" href="javascript:;" @click="closeMsgModal">确认</a>
    </div>
  </modal>
  <Register :isShow="registerModalFlag" @close="closeRegisterModal"></Register>
</header>
</template>
<script>
import './../assets/css/login.css'
import Modal from './base/Modal'
import Register from './Register'
import {eventBus} from '../eventBus'
import {mapGetters} from 'vuex'

export default {
  components: {
    Modal,
    Register
  },
  data () {
    return {
      userName: '',
      userPwd: '',
      errorTip: false,
      loginModalFlag: false,
      msgModalFlag: false,
      msg: '',
      hideClose: false,
      clickBgClose: true,
      registerModalFlag: false
    }
  },
  computed: mapGetters({'nickName': 'getNickName', 'cartCount': 'getCartCount'}),
  mounted () {
    this.checkLogin()
    // 未登录状态
    eventBus.$on('unLogin', (doSomethinAfterLogin, popConfig) => {
      this.loginModalFlag = true
      // 看看是否有登录后的回调队列，没有则创建
      // 不一起初始化的原因是，这个未必需要响应式
      if (!this.loginCallbackArr) {
        this.loginCallbackArr = [doSomethinAfterLogin]
      } else {
        this.loginCallbackArr.push(doSomethinAfterLogin)
      }
      // 针对登录框的一些特殊设定
      if (popConfig) {
        for (let key in popConfig) {
          this[key] = popConfig[key]
        }
      }
    })
    // 登录成功
    eventBus.$on('login', () => {
      // this.getCartCount()
      this.$store.dispatch('fetchCartCount')

      // 如果有需要调用的回调，则拿出来执行
      if (this.loginCallbackArr && this.loginCallbackArr.length) {
        this.loginCallbackArr.forEach((fnItem) => {
          typeof fnItem === 'function' && fnItem()
        })
        this.loginCallbackArr = []
      }
    })
    // 退出登录
    eventBus.$on('logOut', () => {
      this.$store.commit('updateUserInfo', '')
    })
  },
  methods: {
    closeRegisterModal () {
      this.registerModalFlag = false
    },
    closeMsgModal () {
      this.msgModalFlag = false
    },
    showMsgModal (msg) {
      this.msg = msg
      this.msgModalFlag = true
    },
    checkLogin () {
      this.$http.post('/api/users/checkLogin').then((res) => {
        if (res.data.status === '0') {
          this.$store.commit('updateUserInfo', res.data.result.userName)
          this.loginModalFlag = false
          eventBus.$emit('login')
        } else {
          // 如果不在商品列表页，则自动跳转到商品页面
          if (this.$route.path !== '/goods') {
            // this.$router.push("/goods")
          }
        }
      }, err => this.showMsgModal(`check error: ${err}`))
    },
    closeLoginModal () {
      // 只要关闭登录框，就表示放弃当前操作
      this.loginCallbackArr = []
      this.loginModalFlag = false
    },
    login () {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true
        return
      }
      this.$http.post('/api/users/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then((res) => {
        res = res.data
        if (res.status === '0') {
          this.errorTip = false
          this.loginModalFlag = false
          this.$store.commit('updateUserInfo', res.result.userName)
          eventBus.$emit('login')
          // this.showMsgModal(res.msg)
        } else {
          this.errorTip = true
        }
      }, err => this.showMsgModal(`login err: ${err}`))
    },
    logOut () {
      this.$http.post('/api/users/logout').then((res) => {
        if (res.data.status === '0') {
          eventBus.$emit('logOut')
        } else {
          this.showMsgModal(res.data.msg)
        }
      }, err => this.showMsgModal(`logout error:${err}`))
    }/* ,
      ...mapActions(['fetchCartCount']) */
    /* getCartCount () {
        this.$http.post('/api/users/getCartCount').then((res) => {
          if(res.data.status === '0'){
            this.cartCount = res.data.result.cartCount
          } else {

          }

        }, err => this.showMsgModal(`check error: ${err}`))
      } */
  }
}
</script>

<style>
  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }
  .navbar-brand-logo {
    /*width: 120px;*/
  }
  .header a, .footer a {
    color: #666;
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-link {
    padding-left: 15px;
  }
  .navbar-cart-container {
    position: relative;
  }
  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }
</style>
