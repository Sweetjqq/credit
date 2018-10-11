<template lang="pug">
el-form(
  :inline="inline"
  :label-width="labelWidth"
  :label-position="inline ? 'right' : 'left'"
  :model="model"
  :rules="rules"
)
  slot
</template>
<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String
    },
    model: Object,
    rules: Object
  }
}
</script>
