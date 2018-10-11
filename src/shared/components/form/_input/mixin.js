import { difference } from 'lodash'

export default {
  props: {
    value: null,
    disabled: Boolean,
    type: String,
    placeholder: String,
    text: String
  },

  data() {
    return {
      model: '',
      model2: '' // autocomplete组件使用
    }
  },

  beforeMount() {
    this.sync(this.value)
  },

  watch: {
    value: {
      handler(newValue, oldValue) {
        if (
          (Array.isArray(newValue) && difference(newValue, oldValue).length) ||
          difference(oldValue, newValue).length ||
          !Array.isArray(newValue)
        ) {
          this.sync(newValue)
        }
      },
      deep: true
    },

    model: {
      handler(newValue, oldValue) {
        if (
          (Array.isArray(newValue) && difference(newValue, oldValue).length) ||
          difference(oldValue, newValue).length ||
          !Array.isArray(newValue)
        ) {
          if (newValue) {
            if (this.type === 'date') {
              // convert to timestamp which is accepted by backend service
              if (Array.isArray(newValue)) {
                newValue = newValue.map(
                  item => (item instanceof Date ? item.getTime() : '')
                )
              } else {
                newValue = newValue instanceof Date ? newValue.getTime() : ''
              }
            } else if (this.type === 'checkbox') {
              if (Array.isArray(newValue)) {
                newValue = newValue.map(item => ({ code: item }))
              }
            } else if (this.maxlength && newValue.length > this.maxlength) {
              newValue = newValue.slice(0, this.maxlength)
              this.model = newValue
            }
          }
          this.$emit('input', newValue)
          this.$emit('change', newValue)
        }
      },
      deep: true
    }
  },
  methods: {
    sync(value) {
      if (this.type === 'date') {
        if (Array.isArray(value)) {
          // convert to Date type which is accepted by ElDatePicker component
          this.model = value.map(item => item && new Date(item))
        } else {
          this.model = value && new Date(value)
        }
      } else if (this.type === 'checkbox') {
        if (Array.isArray(value)) {
          this.model = value.map(item => item.code)
        } else {
          this.model = value
        }
      } else {
        this.model = value
      }
    },

    // 该方法是为了解决el-select组件被封装后，选择一个选项仍然导致判空校验失败的问题。
    handleModelChange(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
