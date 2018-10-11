<template lang="pug">
div
  .title(v-if="hasTitle")
    slot(name="title")
  .body
    slot(name="body")
  .float(v-if="hasFloat")
    slot(name="float")
</template>

<script>
export default {
  computed: {
    hasFloat() {
      return !!this.$slots['float']
    },

    hasTitle() {
      return !!this.$slots['title']
    }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 1.5rem;
}
.body {
  height: 100%;
}

.float {
  /* position: fixed; */
  text-align: center;
  /* bottom: 0; */
  /* right: 0; */
  /* left: 250px; */
  padding: 10px;
  /* border-top: 1px solid rgba(30, 35, 41, 0.06); */
  /* background-color: #ffffff; */
  /* box-shadow: 0 -1px 3px 0 rgba(0, 34, 77, 0.05); */
}
</style>
