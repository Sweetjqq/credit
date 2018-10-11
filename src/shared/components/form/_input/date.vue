<template lang="pug">
el-date-picker(v-model="model" :type="dateType" :disabled="disabled" :placeholder="placeholder")
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin],

  props: {
    dateType: String
  }
}
</script>
