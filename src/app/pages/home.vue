<template lang="pug">
el-container
  el-header.app-header(height="80px")
    v-header-bar
  el-container.app-body(style="margin-top: 80px")
    el-aside(width="250px" style="z-index: 10")
      v-side-navi-bar
      vFooter
    el-main(style="margin-bottom:66px")
      router-view
</template>

<script>
import vSideNaviBar from '../components/page/side-navi-bar'
import vHeaderBar from '../components/page/header-bar'
import vFooter from '../components/page/footer'

export default {
  components: {
    vHeaderBar,
    vSideNaviBar,
    vFooter
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
</style>
