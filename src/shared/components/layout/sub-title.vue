<template>
  <h5 class="sub-title">
    <slot />
  </h5>
</template>

<script>
export default {

}
</script>

<style lang="sass">
.sub-title
  margin: 0
  font-size: 14px
  font-weight: normal
  &::before
    content: " "
    display: inline-block
    width: 4px
    height: 14px
    background: #9e9e9e
    vertical-align: middle
    margin-top: -2px
    margin-right: 10px
</style>
