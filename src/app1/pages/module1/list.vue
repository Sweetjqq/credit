<template lang="pug">
v-content
  template(slot="body")
    v-section(title="查询条件")
      v-form(inline label-width="80px")
        v-input(label="文本" placeholder="请输入" v-model="query.text")
        v-input(label="下拉" placeholder="请选择" v-model="query.select" type="select" :options="options.option")
        v-input(label="时间" placeholder="请选择区间" v-model="query.date" type="date" date-type="daterange")
        v-button(text="查询" type="primary" @click="handleQueryClick")
        v-button(text="新增" type="primary" @click="handleAddClick")
    v-section(title="查询结果")
      v-pagination(:onLoad="loadTrustRecordList")
        v-table(:columns="tableColumns" :data="trustRecordList" :loading="loading" @sort="handleSortChange")
          template(slot="date" slot-scope="{row}")
            | {{row.date | date}}
          template(slot="checkbox" slot-scope="{row}")
            | {{row.checkbox.map(item => item.label).join('，')}}
          template(slot="action" slot-scope="{row}")
            v-button(text="查看" type="text" @click="handleViewClick(row)")
            v-button(text="删除" type="text" @click="handleRemoveClick(row)")
</template>

<script>
import { getCookie } from "../../api/mUtils";
import api from "../../api/trustRecord";
import dictionaryApi from "../../api/dictionary";
import searchMixin from "@/shared/mixins/search";
import {
  createTableColumn,
  parseDictionaryToOption
} from "@/shared/common/utils";
import { getApi } from '../../api/index'

export default {
  mixins: [searchMixin],

  data() {
    return {
      loading: false,
      trustRecordList: [],
      tableColumns: [
        createTableColumn("text", "文本", true),
        createTableColumn("password", "密码"),
        createTableColumn("textarea", "文本域"),
        createTableColumn("date", "日期", true),
        createTableColumn("select.label", "下拉", true),
        createTableColumn("checkbox", "多选"),
        createTableColumn("radio.label", "单选"),
        createTableColumn("action", "操作")
      ],
      options: {
        option: []
      },
      query: {
        text: "",
        select: "",
        date: [],
        sort: "text,asc"
      }
    };
  },
  created() {
    this.isHasToken();
    // this.getAuth();
    console.log(this, "###########");
  },
  mounted(){
    // this.$router.go(0);
  },
  beforeMount() {
      dictionaryApi.fetchDictionary("option", "选项").then(({ data }) => {
      this.options.option = data.map(parseDictionaryToOption);
    });
  },
  methods: {
   
    isHasToken() {
      if (!getCookie("Token")) {
        this.$router.push("/login");
      }
    },
    loadTrustRecordList(page, size) {
      this.loading = true;
      return api
        .fetchTrustRecordList({ page, size, query: this.query })
        .then(({ data }) => {
          this.loading = false;
          this.trustRecordList = data.content;
          return data.totalElements;
        });
    },

    handleSortChange(e) {
      this.query.sort = e;
      this.search();
    },

    handleViewClick(row) {
      this.$router.push(`/module1/${row.id}`);
    },

    handleQueryClick() {
      this.search();
    },

    handleAddClick() {
      this.$router.push("/module1/0");
    },

    handleRemoveClick(row) {
      this.$warn("确定删除吗？").then(() => {
        api.removeTrustRecord(row.id).then(() => {
          this.search();
        });
      });
    }
  }
};
</script>
