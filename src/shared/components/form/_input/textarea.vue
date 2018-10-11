<template lang="pug">
el-input(
  type="textarea"
  v-model="model"
  :rows="rows"
  :disabled="disabled"
  :placeholder="placeholder"
)
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],

  props: {
    rows: Number
  }
}
</script>
