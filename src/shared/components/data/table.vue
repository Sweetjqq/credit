<template>
  <el-table :data="data" stripe v-loading="loading" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" v-if="selectable" header-align="center">
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-if="!column.hidden" :label="column.title" :prop="column.name" :sortable="column.sortable" header-align="center" :key="index">
      <template slot-scope="scope">
        <slot :name="column.name" :row="scope.row">
          {{getLabel(scope.row, column.name)}}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array
    },

    data: {
      type: Array
    },

    loading: {
      type: Boolean
    },

    selectable: {
      type: Boolean
    }
  },

  methods: {
    handleSortChange(e) {
      if (e.prop) {
        this.$emit(
          'sort',
          `${e.prop},${e.order === 'ascending' ? 'asc' : 'desc'}`
        )
      }
    },

    handleSelectionChange(val) {
      this.$emit('selection-change', val)
    },

    getLabel(row, columnName) {
      if (!row || !columnName) return

      const propertyName = columnName.split('.') // suport nested property
      let propertyValue
      for (let i = 0; i < propertyName.length; i++) {
        propertyValue = propertyValue
          ? propertyValue[propertyName[i]]
          : row[propertyName[i]]
        if (propertyValue === null || propertyValue === undefined) return
      }
      return propertyValue
    }
  }
}
</script>
