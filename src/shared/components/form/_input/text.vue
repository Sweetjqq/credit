<template lang="pug">
el-input(
  v-model="model"
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
    maxlength: Number
  }
}
</script>
