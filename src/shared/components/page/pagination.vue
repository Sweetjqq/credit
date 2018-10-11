<template>
  <div>
    <slot />
    <el-pagination :total="pager.total" :page-size="pager.size" :current-page="pager.current" :page-sizes="pageSizes" @size-change="changePageSize" @current-change="loadByPage">
    </el-pagination>
  </div>
</template>
<script>
import eventHub from '@/shared/common/eventHub'

export default {
  data() {
    return {
      pager: {
        current: 1,
        size: 10,
        total: 0 // 记录总数
      }
    }
  },

  props: {
    onLoad: {
      type: Function
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100]
      }
    }
  },

  methods: {
    // 查询
    search(pager) {
      if (pager && pager.size) {
        this.pager.size = pager.size
      }
      this.loadByPage(pager ? pager.current : 1)
    },

    // 查询某页
    loadByPage(page) {
      const vm = this
      vm.pager.current = page
      // loadItems在具体的Component中实现
      // TODO: 想办法消除与search mixin的耦合
      vm.loadItems().then(total => {
        vm.pager.total = total
      })
    },

    // 更换每页数
    changePageSize(pageSize) {
      this.pager.size = pageSize
      this.search(false, this.pager)
    },

    loadItems() {
      return this.onLoad(this.pager.current - 1, this.pager.size)
    }
  },

  beforeMount() {
    this.pager.size = this.pageSizes[0]
    // 解除之前绑定的事件回调
    eventHub.$off('search')

    // 绑定事件回调
    eventHub.$on('search', ({ pager = null }) => {
      this.search(pager)
    })
  }
}
</script>
<style>
.el-pagination {
  text-align: right;
}
</style>
