<template>
  <el-menu mode="vertical">
    <template v-for="(item, index) in model">
      <v-menu :model="item" :key="index" />
    </template>
  </el-menu>
</template>

<script>
import vMenu from './menu'
export default {
  name: 'navi',
  components: { vMenu },
  props: {
    model: {
      type: Array,
      required: true,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleMenuItemClick(item) {
      this.$router.push({ name: item.name })
    }
  }
}
</script>
