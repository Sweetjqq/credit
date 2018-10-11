<template lang="pug">
v-section(title="查询")
  v-form(inline label-width="80px")
    slot
    v-form-item.ml-5
      v-button(text="取消" @click="$emit('cancel')")
      v-button(text="查询" type="primary" @click="$emit('query')")
</template>

<script>
export default {}
</script>
