<template lang="pug">
el-checkbox-group(v-model="model")
  el-checkbox(
    v-for="(option, index) in options"
    :index="index"
    :label="option.value"
    :key="option.value"
    :disabled="disabled"
   ) {{option.label}}
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],

  props: {
    options: Array
  },

  methods: {
    handleChange() {
      this.$emit('input', this.model)
      this.$emit('change')
    }
  }
}
</script>
