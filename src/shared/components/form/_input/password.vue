<template lang="pug">
el-input(
  v-model="model"
  type="password"
  :placeholder="placeholder"
  :disabled="disabled"
  :maxlength="maxlength"
  )
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],
  props: {
    maxlength: Number,
    placeholder: String
  }
}
</script>
