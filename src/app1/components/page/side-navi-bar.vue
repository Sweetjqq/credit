<template>
  <div :class="['side-bar']">
    <v-navi v-if="menu" :model="menu" />
  </div>
</template>

<script>
import { format } from "@/shared/common/utils";
import { routes } from "../../router";
import vNavi from "./navi.vue";
import { getCookie } from "../../api/mUtils";
import { getApi } from "../../api/index";
import { nullLiteral, thisTypeAnnotation } from "babel-types";

export default {
  data() {
    return {
      menu:[]
    };
  },
  components: {
    vNavi
  },
 
  beforeMount() {
    
  },
  mounted() {
    console.log(sessionStorage.getItem("MenuKey"),'sessionStorage.getItem("MenuKey")')
    this.menu = JSON.parse(sessionStorage.getItem("MenuKey"))
    // this.$router.push('/module/list');
  }
};
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
