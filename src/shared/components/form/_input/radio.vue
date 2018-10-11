<template lang="pug">
el-radio-group(v-model="model")
  el-radio.radio(
    v-for="option in options"
    :key="option.value"
    :label="option.value"
    :disabled="disabled"
    ) {{option.label}}
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
