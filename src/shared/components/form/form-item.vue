<template lang="pug">
el-form-item(:label="label" :prop="prop")
  slot
</template>
<script>
export default {
  props: {
    label: String,
    prop: String
  }
}
</script>
