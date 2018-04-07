<template>
  <div id="app">
    <router-view/>
    <modal :mdShow="msgModalFlag" @close="closeMsgModal">
      <div slot="message">{{ msg }}</div>
      <div slot="btnGroup">
          <a class="btn btn--m btn--red" href="javascript:;" @click="closeMsgModal">确认</a>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './components/base/Modal'
// 将公用样式的弹窗组件放到父层，利用eventBus进行展示回调
import {eventBus} from './eventBus'

export default {
  name: 'App',
  components: {
    Modal
  },
  data () {
    return {
      msgModalFlag: false,
      msg: ''
    }
  },
  mounted () {
    eventBus.$on('showMsg', (msg) => {
      this.showMsgModal(msg)
    })
    eventBus.$on('hideMsg', () => {
      this.closeMsgModal()
    })
  },
  methods: {
      showMsgModal (msg) {
        this.msg = msg
        this.msgModalFlag = true
      },
      closeMsgModal () {
        this.msgModalFlag = false
      }
  }
}
</script>

<style>
.left{
    width:20%;
    border: 1px solid gray;
    float: left;
  }
</style>
