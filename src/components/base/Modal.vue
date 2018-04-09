<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-top">
            <div class="md-title" v-if="mdTitle">{{ mdTitle }}</div>
            <button v-show="!hideClose" class="md-close" @click="closeModal">关闭</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="clickBgClose ? closeModal() : ''"></div>
    </div>
</template>
<style>

</style>
<script>
export default{
  props: {
    'mdShow': {
      type: Boolean,
      default: false
    },
    'mdTitle': {
      type: String,
      default: ''
    },
    'hideClose': {
      type: Boolean,
      default: false
    },
    'clickBgClose': {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.confirm-tips ul{
  width: 100%;
}
</style>
