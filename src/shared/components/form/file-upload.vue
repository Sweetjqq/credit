<template lang="pug">
v-form-item(:label="label" :prop="prop")
  input.d-none(type="file" @change="handleFileChange" :accept="accept")
  .d-flex
    .w-25.text-center
      div
        template(v-if="value && value.url")
          img.w-100(v-if="isImage" :src="value.url")
          a.text-primary(v-else target="blank" :href="value.url" title="点击下载") {{value.title}}
        template(v-else)
          img.w-50(v-if="isImage" src="/static/images/head.png")
          i(v-else class="el-icon-document" style="font-size: 6rem")
      .mt-3
        v-button(v-if="!disabled" :text="value.url ? '重新上传' : '点击上传'" @click="handleUploadClick" size="mini" type="primary" plain)
    .w-75.pl-5(v-if="!disabled")
      div 建议上传{{fileType}}格式的文件
      slot
</template>

<script>
// import qiniuApi from '@/api/qiniu'
// const QINIU_BULKET = process.env.QINIU_BULKET

export default {
  props: {
    value: null,
    label: String,
    disabled: Boolean,
    required: Boolean,
    prop: String,
    type: {
      type: String,
      default: 'image'
    }
  },

  methods: {
    handleUploadClick() {
      this.fileEl.click()
    },

    handleFileChange(e) {
      // const files = e.target.files || e.dataTransfer.files
      // if (!files.length) {
      //   return
      // }
      // const file = files[0]
      // qiniuApi.upload(file).then(res => {
      //   this.value.url = `${QINIU_BULKET}${res.data.key}`
      //   this.value.title = file.name
      // })
    }
  },

  computed: {
    fileEl() {
      return this.$el.getElementsByTagName('input')[0]
    },

    fileType() {
      switch (this.type) {
        case 'pdf':
          return 'PDF'
        case 'image':
          return 'JPEG、JPG、PNG'
        case 'word':
          return 'DOCDOCX'
        case 'ppt':
          return 'PPT、PPTX'
        case 'pdf,ppt':
          return 'PDF、PPT'
        default:
          return ''
      }
    },

    isImage() {
      return this.type === 'image'
    },

    accept() {
      switch (this.type) {
        case 'image':
          return 'image/*'
        case 'pdf':
          return 'application/pdf'
        case 'word':
          return 'application/msword'
        case 'ppt':
          return 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation'
        case 'pdf,ppt':
          return 'application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation'
        default:
          return ''
      }
    }
  }
}
</script>
