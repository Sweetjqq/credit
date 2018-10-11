<template>
  <el-dialog :title="title" :visible="value" :width="width" center @close="handleClose">
    <slot />
    <span slot="footer" class="dialog-footer" v-if="hasFooter">
      <slot name="footer" />
    </span>
  </el-dialog>
</template>

<script>
const width = {
  medium: '57rem',
  small: '36rem',
  mini: '22rem'
}

export default {
  props: {
    title: String,
    value: Boolean,
    size: {
      type: String,
      default: 'small'
    }
  },

  methods: {
    handleClose() {
      this.$emit('input', false)
      this.$emit('close')
    }
  },

  computed: {
    hasFooter() {
      return !!this.$slots['footer']
    },
    width() {
      return width[this.size]
    }
  }
}
</script>
<style>
.dialog-footer {
  text-align: center;
}
</style>
