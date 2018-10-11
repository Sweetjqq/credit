<template>
  <div v-if="model.label" id="menuBox">
    <el-submenu :index="model.name" v-if="model.children">
      <template slot="title">
       
       <img class="menuIcon" :src='model.icon' alt="">
        <div class="menuText"> {{model.label}}</div>
        </template>
      <template v-if="model.children">
        <v-menu v-for="(item, index) in model.children" :model="item" :key="index" />
      </template>
    </el-submenu>
    <el-menu-item v-else :index="model.name" @click="handleMenuItemClick(model)">
      <a>
        <img class="menuIcon" :src='model.icon' alt="">
        <div  class="menuText"> {{model.label}}</div>
      </a>
    </el-menu-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes as userGetterTypes } from '../../store/auth/types'

export default {
  name: 'v-menu',
  props: {
    model: Object
  },
  methods: {
    handleMenuItemClick(item) {
      this.$router.push({ name: item.name })
    }
  },
  computed: {
    ...mapGetters({
      userInfo: userGetterTypes.USER_INFO
    })
  }
}
</script>


<style  scoped>
.el-menu-item{
  margin-top: 30px;
      margin-left: 80px;
      height: 90px;
      width: 90px;
      border:1px solid #549baf;
      border-radius: 4px;
}

.menuIcon{
  padding-left: 10px;
}
.menuText{
    color:#549baf;
    position: absolute;
    top: 36px;
    left: 16px;
}


</style>

