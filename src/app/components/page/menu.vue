<template>
  <div v-if="model.label"  v-show="model.hidden">
    <el-submenu :index="model.name" v-if="model.children&&model.hidden">
      <template slot="title" v-if="model.children.length>0" >
        <i :class="['icon','iconfont','icon-' + model.icon]" v-if="model.icon"></i>
        {{model.label}}
        </template>
      <template>
        <v-menu v-for="(item, index) in model.children" :model="item" :key="index" />
      </template>
    </el-submenu>

    <el-menu-item v-else :index="model.name" @click="handleMenuItemClick(model)">
      <a>
        <i :class="['icon','iconfont','icon-' + model.icon]" v-if="model.icon"></i>
        {{model.label}}
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
