<template lang="pug">
el-select(
  v-model="model"
  :disabled="disabled"
  @change="handleModelChange")
  el-option(
    v-for="option in options"
    :key="option.key"
    :label="option.label"
    :value="option.value"
    :disabled="option.disabled"
  )
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],

  props: {
    options: Array
  }
}
</script>
