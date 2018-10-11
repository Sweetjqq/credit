<template lang="pug">
v-content
  template(slot="body")
    v-form(label-width="180px" :model="trustRecord" :rules="rules" ref="form")
      v-section(title="基本信息")
        v-input(label="文本" v-model.trim="trustRecord.text" prop="text")
        v-input(label="密码" type="password" v-model.trim="trustRecord.password" prop="password")
        v-input(label="文本域" type="textarea" v-model.trim="trustRecord.textarea" prop="textarea")
        v-input(label="日期" type="date" date-type="datetime" v-model="trustRecord.date" prop="date")
        v-input(label="下拉" type="select" v-model="trustRecord.select.code" :options="options.option")
        v-input(label="多选" type="checkbox" v-model="trustRecord.checkbox" :options="options.option")
        v-input(label="单选" type="radio" v-model="trustRecord.radio.code" :options="options.option")
  template(slot="float")
    template
      v-button(text="取消" @click="handleCancelClick")
    template
      v-button(text="保存" type="primary" @click="handleSaveClick")
</template>

<script>
import { cloneDeep } from 'lodash'
import api, { createTrustRecord } from '../../api/trustRecord'
import dictionaryApi from '../../api/dictionary'
import {
  parseDictionaryToOption,
  createValidationRule,
  createValidator
} from '@/shared/common/utils'

const defaultTrustRecord = createTrustRecord()

export default {
  data() {
    return {
      trustRecord: cloneDeep(defaultTrustRecord),
      readonly: false,
      options: {
        option: []
      },
      rules: {
        text: [createValidationRule('请输入文本')],
        password: [
          createValidationRule('请输入密码'),
          {
            validator: createValidator([
              { expression: /^\d{6,}$/, message: '密码至少6位数字' }
            ]),
            trigger: 'blur'
          }
        ],
        date: [createValidationRule('请选择日期', 'number')]
      }
    }
  },

  beforeMount() {
    this.init()
    dictionaryApi.fetchDictionary('option', '选项').then(({ data }) => {
      this.options.option = data.map(parseDictionaryToOption)
    })
  },

  methods: {
    init() {
      if (this.id) {
        api.fetchTrustRecord(this.id).then(({ data }) => {
          this.trustRecord = data
        })
      } else {
        this.trustRecord = cloneDeep(defaultTrustRecord)
      }
    },

    handleCancelClick() {
      this.$router.back()
    },

    handleSaveClick() {
      this.$refs['form'].$children[0].validate(valid => {
        if (valid) {
          api.saveTrustRecord(this.trustRecord).then(() => {
            this.$router.back()
          })
        }
      })
    }
  },

  computed: {
    id() {
      return parseInt(this.$route.params.id) || 0
    }
  }
}
</script>
