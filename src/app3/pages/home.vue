<template lang="pug">
el-container
  el-header.app-header(height="80px")
    v-header-bar
  el-container.app-body(style="margin-top: 80px")
    el-aside(width="250px" style="z-index: 10")
      v-side-navi-bar
    el-main(style="min-width:928px;overflow:hidden;")
      router-view
</template>

<script>
import vSideNaviBar from '../components/page/side-navi-bar'
import vHeaderBar from '../components/page/header-bar'

export default {
  components: {
    vHeaderBar,
    vSideNaviBar
  }
}
</script>

<style lang="sass">
@import "../../shared/styles/variable"
.app-header
  position: fixed
  left: 0
  right: 0
  z-index: 10
  background-color: $--color-primary
  padding-right: 0
</style>
