<template lang="pug">
v-form-item(:label="label" :prop="prop")
  vv-input(
    v-model="model"
    :type="type"
    :options="options"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :rows="rows"
    :disabled="disabled"
    :dateType="dateType"
    :title="title"
    :min="min"
    :max="max"
    :step="step"
    :fetch="fetch"
    :text="text"
    @change="handleModelChange"
    )
</template>

<script>
import vvInput from './_input/index'

export default {
  props: {
    value: {},
    label: String,
    type: String,
    options: Array,
    disabled: Boolean,
    required: Boolean,
    maxlength: Number,
    placeholder: String,
    rows: {
      type: Number,
      default: 3
    },
    dateType: {
      type: String,
      default: 'date'
    },
    title: String,
    min: Number,
    max: Number,
    step: Number,
    prop: String,
    fetch: Function,
    text: String
  },

  data() {
    return {
      model: null
    }
  },

  beforeMount() {
    this.model = this.value
  },

  methods: {
    handleModelChange(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  },

  watch: {
    value: {
      handler(newValue, oldValue) {
        // console.log(
        //   `input ${this.label}'s value chagne from ${JSON.stringify(
        //     oldValue
        //   )} to ${JSON.stringify(newValue)}`
        // )
        this.model = newValue
      },
      deep: true
    },
    model: {
      handler(newValue, oldValue) {
        // console.log(
        //   `input ${this.label}'s model change from ${JSON.stringify(
        //     oldValue
        //   )} to ${JSON.stringify(newValue)}`
        // )
        this.$emit('input', newValue)
        this.$emit('change', newValue)
      },
      deep: true
    }
  },

  components: {
    vvInput
  }
}
</script>
