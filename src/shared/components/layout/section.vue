<template lang="pug">
.section
  h4.section-title(v-if="hasTitle") {{title}}
    .section-title-element
      slot(name="title")
  .section-body
    slot
</template>

<script>
export default {
  props: {
    title: String
  },

  computed: {
    hasTitle() {
      return !!this.$slots['title'] || !!this.title
    }
  }
}
</script>

<style lang="sass">
.section
  margin-bottom: 20px
.section-title
  margin: 0
  padding: 20px
  padding-bottom: 0
  display: flex
  font-weight: 400
.section-title-element
  flex: 1
  margin-left: 20px
  *
    margin: 0 !important
.section-body
  padding: 20px
</style>
