<template>
  <el-row type="flex" :justify="justify">
    <slot />
  </el-row>
</template>

<script>
export default {
  props: {
    justify: String
  }
}
</script>
