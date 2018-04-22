<template>
  <Modal :mdShow="isShow" @close="closeRegisterModal" mdTitle="注册" >
      <template slot="message">
          <div class="error-wrap">
                <span class="error error-show" v-show="errorTip">{{ errorTip }}</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="registername" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="请输入用户名" data-type="registername" v-focus>
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="register">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="repassword" v-model="userRPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请再次输入密码" @keyup.enter="register">
              </li>
              <li class="regi_form_input">
                <i class="icon IconEmail"></i>
                <input type="text" tabindex="1" name="registername" v-model="userEmail" class="regi_login_input regi_login_input_left" placeholder="请输入邮箱" data-type="registername" v-focus>
              </li>
              <li class="regi_form_input">
                <i class="icon IconPhone"></i>
                <input type="text" tabindex="1" name="registername" v-model="userPhone" class="regi_login_input regi_login_input_left" placeholder="请输入手机号" data-type="registername" v-focus>
              </li>
              <li class="regi_form_input">
                <i class="icon icon-question"></i>
                <input type="text" tabindex="1" name="registername" v-model="userQuestion" class="regi_login_input regi_login_input_left" placeholder="请输入密保问题" data-type="registername" v-focus>
              </li>
              <li class="regi_form_input">
                <i class="icon IconEmail"></i>
                <input type="text" tabindex="1" name="registername" v-model="userAnwser" class="regi_login_input regi_login_input_left" placeholder="请输入密保答案" data-type="registername" v-focus>
              </li>
            </ul>
      </template>
      <a href="javascript:;" class="btn-login" @click="register" slot="btnGroup">注  册</a>
  </Modal>
</template>
<script>
import Modal from './base/Modal'
import {eventBus} from '../eventBus'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Modal
  },
  data () {
    return {
      userName: '',
      userPwd: '',
      userRPwd: '',
      userQuestion: '',
      userAnwser: '',
      userPhone: '',
      userEmail: '',
      errorTip: ''
    }
  },
  methods: {
    closeRegisterModal () {
      this.$emit('close')
    },
    register () {
      if (!this.userName || !this.userPwd) {
        this.errorTip = '用户名或者密码错误'
        return
      }
      if (this.userPwd !== this.userRPwd) {
        this.errorTip = '密码不匹配'
        return
      }
      if (this.userEmail.indexOf('@') === -1) {
        this.errorTip = '请输入正确的邮箱'
        return
      }
      if (/^1(3|4|5|7|8)\d{9}$/.test(this.userPhone) === false) {
        this.errorTip = '请输入正确的手机号码'
        return
      }
      this.$http.post('/api/users/register', {
        userName: this.userName,
        userPwd: this.userPwd,
        userRPwd: this.userRPwd,
        userEmail: this.userEmail,
        userPhone: this.userPhone,
        userQuestion: this.userQuestion,
        userAnwser: this.userAnwser
      }).then((res) => {
        res = res.data
        if (res.status === '0') {
          this.errorTip = ''
          this.$emit('close')
          eventBus.$emit('showMsg', '注册成功~请登录')
        } else {
          this.errorTip = res.msg
        }
      }, err => eventBus.$emit('showMsg', `register err: ${err}`))
    }
  }
}
</script>
