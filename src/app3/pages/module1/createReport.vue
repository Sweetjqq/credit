<template>
<div style="min-width:1060px;">
  <el-row>
  <el-col :span="16" style="
    padding-top: 70px;min-width:670px;  padding-left:70px;
">
<div class="block" style="margin-bottom:20px;">
  <label class="el-form-item__label" style="font-weight:700;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;债券</label>

<el-autocomplete
    ref="bondcode"
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  :value="bondName"
      @select="handleSelect"
></el-autocomplete>
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 12px;color: #549baf;">请按照债券简称或者债券代码查询</span>
</div>

    <div style="margin-top: 20px;margin-left: 28px;display:inline-block;">
   <label class="el-form-item__label"  style="font-weight:700;">季度</label>
    <el-select v-model="value10" ref="Month" placeholder="请选择">
    <el-option
      v-for="item in options5"
      :key="item"
      :label="item"
      :value="item"
      >
    </el-option>
  </el-select>
  </div>
      <div style="margin-top: 20px;margin-left: 28px;display:inline-block;">
   <label class="el-form-item__label"  style="font-weight:700;">年</label>
    <el-select @focus="queryMonth()" ref="Month1" v-model="value11" placeholder="请选择">
    <el-option
      v-for="item in arr1"
      :key="item"
      :label="item"
      :value="item"
      >
    </el-option>
  </el-select>
   <label class="el-form-item__label"  style="font-weight:700;float:right;padding-left:10px;">季度</label>
  </div>
  <el-form ref="form" :model="form" label-width="80px" style="margin-top:28px;">
    <el-button type="primary" plain style="
    margin-left: 80px;margin:'10px'
" @click="createReportClick">创建报告</el-button>
  </el-form>
  </el-col>
</el-row>
    </div>
</template>
<script>
const qs = require('querystring');
import {parseUrl} from "../../common/util.js"
import { getCookie ,removeCookie} from "../../api/util";
import {port} from '../../config/port'
import { setCookie } from '../../../../../m-strategy/src/config/index.js';
export default {
  methods: {},

  data() {
    return {
      bondName:'',
      bondCode:'',
      companyCode: "",
      options: [],
      options5: [],
      options6: [],
      value10: [],
      value11: [],
      list: [],
      bondcode: "",
      loading: false,
      arr1: [],
      form: {
        name: "",
        data1: "",
        data2: ""
      },
      time: "",
      states: [],
      restaurants: [],
      state4: "",
      timeout: null,
      queryObj:{}
    };
  },
  created(){
 
  },
  mounted() {
    parseUrl(this.queryObj);
    console.log( parseUrl(this.queryObj));
    console.log(getCookie('Token'))
     console.log(getCookie('currentUserId'));
     console.log(this.queryObj.currentUserId);
     if(!getCookie('Token')){
                 removeCookie('Token')
removeCookie('currentUserId')
removeCookie('DepartmentId')
        this.$router.push("/login");
     }
     if(this.queryObj.Token){
        if(!getCookie('Token') ||getCookie('Token') == undefined ||getCookie('Token') == null || getCookie('currentUserId')!==this.queryObj.currentUserId){
        this.isHasToken();
      }
     }
   
   
  },
  methods: {
    isHasToken() {
    console.log(this.GetRequest(),';111')
    setCookie("Token", this.queryObj.Token);
    setCookie("currentUserId", this.queryObj.currentUserId);
    setCookie("departName", this.queryObj.departName);
    location.reload();
    },
    
 GetRequest() { 
    
},
    queryMonth() {
      this.arr1 = [];
      if (this.curdata) {
        this.time = JSON.stringify(
          this.curdata.quarterList[this.$refs.Month.value]
        );
        this.options6 = this.curdata.quarterList[this.$refs.Month.value];
        for (let item in this.options6) {
          this.arr1.push(item);
        }
      } else {
        this.time = "";
      }
    },

    querySearchAsync(queryString, cb) {
      if (queryString) {
        axios({
          method: "get",
          url: "/v1/creditRating/bondNameListAtCreate",
 headers: {
          Authorization:
            "bearer " +
             getCookie('Token')
        },
          params: {
            userName: getCookie("currentUserId"),
            publisher: "",
            bond: queryString
          }
        }).then(res => {
           if(res.data.status == 401){
           this.$message({
            message: "token过期"
          });
          removeCookie('Token')
removeCookie('currentUserId')
removeCookie('DepartmentId')

        this.$router.push("/login");

        }
          console.log(res.data.data, "resres");
          if (res.data.data.length == 0) {
            this.$message({
              message: "请确认债券简称或债券代码是否正确！"
            });
          } else {
            let arr = [];
            for (let item of res.data.data) {
              let obj = {
                value: "",
                code: "",
                companyCode: ""
              };
              obj.value = item.bondName;
              obj.code = item.bondCode;
              obj.companyCode = item.companyCode;
              arr.push(obj);
            }
            console.log(arr, "arr");
            this.restaurants = arr;
            var restaurants = this.restaurants;
            var results = restaurants;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(results);
            }, 3000 * Math.random());
          }
        }).catch((error)=>{
       if (error == 'Error: Request failed with status code 504') {
        this.$message({
            message: "服务器超时"
        });
        removeCookie('Token')
removeCookie('currentUserId')
removeCookie('DepartmentId')

        this.$router.push("/login");

      }
      })
      }
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleSelect(item) {
      this.bondName  = item.value;
      setTimeout(() => {
        axios({
          method: "get",
          url: "/v1/creditRating/quarterAtCreate",
 headers: {
          Authorization:
            "bearer " +
             getCookie('Token')
        },
          params: {
            userName: getCookie("currentUserId"),
            bondCode: item.code
          }
        }).then(res => {
           if(res.data.status == 401){
           this.$message({
            message: "token过期"
          });
          removeCookie('Token')
removeCookie('currentUserId')
removeCookie('DepartmentId')

        this.$router.push("/login");

        }
          console.log(res.data.data, "res.data.data");
          this.companyCode = item.companyCode;
          this.bondCode = item.code;
          console.log(item, "sssss");
          this.curdata = res.data.data;
          console.log(res, "caocaoca");
          this.options5 = res.data.data.yearList;
        }).catch((error)=>{
       if (error == 'Error: Request failed with status code 504') {
        this.$message({
            message: "服务器超时"
        });
        removeCookie('Token')
removeCookie('currentUserId')
removeCookie('DepartmentId')

        this.$router.push("/login");

      }
      })
      });
    },

    //创建报告
    createReportClick() {
      console.log( this.bondCode, this.companyCode, this.time);
      const value = this.$refs.Month1.value;
      if (this.time && this.$refs.bondcode.value) {
        this.time = JSON.parse(this.time)[value];
        this.$router.push(
          "/CreateCredit?bondCode=" +
            this.bondCode +
            "&quarter=" +
            this.time +"&companyCod="+ this.companyCode
        );
      } else {
        this.$message({
          message: "缺少季报信息，无法生成报表！"
        });
      }
    }
  }
};
</script>

<style>
.el-autocomplete-suggestion.el-popper {
  width: 480px !important;
}
</style>
