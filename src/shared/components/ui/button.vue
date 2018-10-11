<template>
  <el-button :type="type" :size="size" :plain="plain" :disabled="disabled" :icon="icon" :autofocus="autofocus" @click.stop="handleClick">{{text}}</el-button>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    size: {
      type: String
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: Boolean,
    icon: String,
    autofocus: Boolean
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
