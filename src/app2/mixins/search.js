import eventHub from '../../common/eventHub'

export default {
  data() {
    return {
      searchOnLoad: {
        type: Boolean,
        default: true
      }
    }
  },

  mounted() {
    if (this.searchOnLoad) {
      this.search(null, true)
    }
  },

  methods: {
    search(pager = null) {
      eventHub.$emit('search', { pager })
    }
  }
}
