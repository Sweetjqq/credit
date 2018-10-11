<template lang="pug">
transition
  template(v-if="disabled")
    v-checkbox(
      v-if="type==='checkbox'"
      :type="type"
      v-model="model"
      :options="options"
      :disabled="disabled"
      )
    label(v-else-if="ready") {{_text}}
  template(v-else-if="ready")
    v-select(
      v-if="type==='select'"
      :type="type"
      v-model="model"
      :options="options"
      :disabled="disabled"
      @change="handleModelChange"
      )
    v-radio(
      v-else-if="type==='radio'"
      :type="type"
      v-model="model"
      :options="options"
      :disabled="disabled"
      )
    v-checkbox(
      v-else-if="type==='checkbox'"
      :type="type"
      v-model="model"
      :options="options"
      :disabled="disabled"
    )
    template(v-else-if="type==='date'")
      v-date(
        v-model="model"
        type="date"
        :dateType="dateType"
        :disabled="disabled"
        :placeholder="placeholder"
      )
    template(v-else)
      v-textarea(
        v-if="type==='textarea'"
        :type="type"
        v-model="model"
        :rows="rows"
        cols="50"
        :disabled="disabled"
      )
      v-password(
        v-else-if="type==='password'"
        :type="type"
        v-model="model"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :disabled="disabled"
      )
      v-text(
        v-else
        :type="type"
        v-model="model"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :disabled="disabled"
      )
      span(v-if="maxlength && showMaxLength") {{inputLength}}/{{maxlength}})
</template>

<script>
// import { difference } from 'lodash'
import vText from './text'
import vPassword from './password'
import vRadio from './radio'
import vSelect from './select'
import vTextarea from './textarea'
import vDate from './date'
import vCheckbox from './checkbox'
import { date } from '@/shared/common/utils'

export default {
  components: {
    vText,
    vPassword,
    vRadio,
    vSelect,
    vTextarea,
    vDate,
    vCheckbox
  },

  props: {
    value: {},
    type: String,
    disabled: Boolean,
    // 用于select和radio
    options: Array,
    // 用户text, password和textarea
    maxlength: Number,
    showMaxLength: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    // 用于textarea
    rows: {
      type: Number,
      default: 3
    },
    // 用于date
    dateType: {
      type: String,
      default: 'date'
    },
    // 用于checkbox
    title: String,
    // 用于number
    min: Number,
    max: Number,
    step: Number,

    text: String
  },

  data() {
    return {
      model: ''
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
      handler(newVal, oldVal) {
        this.model = newVal
      },
      deep: true
    },
    model: {
      handler(value) {
        this.$emit('input', value)
        this.$emit('change', value)
      },
      deep: true
    }
  },

  computed: {
    _text() {
      if (this.text) return this.text

      if (this.type === 'date') {
        const format =
          this.dateType === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
        if (!this.isArray) {
          return `${date.format(this.model, format)}`
        } else {
          return this.model.map(item => date.format(item, format)).join('-')
        }
      } else if (this.type === 'select' || this.type === 'radio') {
        const option = this.options.find(
          o => o.value === `${this.model}` || o.value === this.model
        )
        return option ? option.label : ''
      } else {
        return this.model
      }
    },

    ready() {
      if (this.type === 'select' || this.type === 'radio') {
        return this.options && this.options.length > 0
      } else {
        return true
      }
    },

    inputLength() {
      return this.value ? this.value.length : 0
    },

    isArray() {
      return Array.isArray(this.value)
    }
  }
}
</script>

<style scoped>
.control-label {
  text-align: left;
}

label.control-label {
  font-weight: normal;
}
</style>
