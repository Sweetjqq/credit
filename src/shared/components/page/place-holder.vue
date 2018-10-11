<template>
  <div>
    <router-view />
    <!-- <v-loading :visible="loading.isLoading" :message="loading.message" /> -->
    <!-- <v-alert :message="message.content" :type="message.type" :onCancel="handleCancelClick" :onConfirm="handleConfirmClick" /> -->
  </div>
</template>

<script>
import eventHub from '../../common/eventHub'

export default {
  name: 'place-holder',

  data() {
    return {
      loading: {
        isLoading: false,
        message: ''
      },
      message: {
        type: 'info',
        content: '',
        resolve: null,
        reject: null
      }
    }
  },

  beforeMount() {
    eventHub.$on('loading-begin', (message = '加载中') => {
      this.loading.isLoading = true
      this.loading.message = message
    })

    eventHub.$on('loading-end', () => {
      this.loading.isLoading = false
    })

    eventHub.$on('saving-begin', (message = '保存中') => {
      this.loading.isLoading = true
      this.loading.message = message
    })

    eventHub.$on('saving-end', () => {
      this.loading.isLoading = false
    })

    eventHub.$on('show-message', message => {
      this.message = {
        type: 'info',
        content: message
      }
    })

    eventHub.$on('show-confirm', ({ message, resolve, reject }) => {
      this.message = {
        type: 'confirm',
        content: message,
        resolve,
        reject
      }
    })
  },

  methods: {
    handleConfirmClick() {
      this.message.resolve && this.message.resolve()
      this.clearMessage()
    },
    handleCancelClick() {
      // this.message.reject && this.message.reject()
      this.clearMessage()
    },

    clearMessage() {
      this.message = {
        type: '',
        content: '',
        resolve: null,
        reject: null
      }
    }
  }
}
</script>
