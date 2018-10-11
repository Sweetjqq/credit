<template>
  <div :class="['side-bar']">
    <v-navi :model="menu" />
  </div>
</template>

<script>
import { routes } from '../../router'
import vNavi from './navi.vue'

export default {
  data() {
    return {
      menu: routes[1].children
    }
  },
  components: {
    vNavi
  }
}
</script>

<style lang="sass">
  @import "../../../shared/styles/_variable"
  .side-bar
    position: fixed
    transition: all
    transition-duration: 300ms
    height: calc(100% - 80px)
    color: $color_side_bar
    width: $l_sidebar_width_normal
    overflow-y: auto
    box-shadow: $--box-shadow
    z-index: 10
    .el-menu
      height: 100%
</style>
