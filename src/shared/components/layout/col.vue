<template>
  <el-col :span="span" :offset="offset" :xs="xs" :sm="sm" :md="md" :lg="lg">
    <slot />
  </el-col>
</template>

<script>
export default {
  props: {
    span: Number,
    offset: Number,
    xs: Number,
    sm: Number,
    md: Number,
    lg: Number
  }
}
</script>
