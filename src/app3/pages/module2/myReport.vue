<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
  
      <el-row>
  
        <el-col :xs="10" :sm="9" :md="9" :lg="8" :xl="5">
          <div class="block" style="margin-bottom:20px;">
            <label class="el-form-item__label" style="font-weight:700;">发行人</label>
            <el-autocomplete ref="issuer" v-model="state1" :fetch-suggestions="querySearchAsync1" placeholder="请输入内容" @select="handleSelect1"></el-autocomplete>
          </div>
        </el-col>
  
  
  
        <el-col :xs="10" :sm="9" :md="9" :lg="8" :xl="5">
          <div class="block" style="margin-bottom:20px;">
            <span class="el-form-item__label" style="font-weight:700;">债券名称</span>
  
            <el-autocomplete ref="bond" v-model="state2" :fetch-suggestions="querySearchAsync2" placeholder="请输入内容" @select="handleSelect2"></el-autocomplete>
          </div>
        </el-col>
  
        <el-col :xs="16" :sm="13" :md="13" :lg="13" :xl="7">
          <div class="block">
            <label class="el-form-item__label" style="font-weight:700;">创建时间</label>
            <el-date-picker @change="search()" style="width: 400px;" ref="data" value-format="yyyy-MM-dd" v-model="value3" type="daterange" align="center" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :xs="6" :sm="4" :md="4" :lg="1" :xl="4">
          <el-button type="primary" plain class="btn" @click="search">查询</el-button>
        </el-col>
  
      </el-row>
    </el-form>
  
  
  
    <div>
  
    </div>
  
    <el-table :data="tableData" border style="width: 100% ;margin-top:20px;color:#50b4e0">
      <el-table-column fixed prop="title" label="报告名称">
      </el-table-column>
      <el-table-column prop="publisher" label="发行人">
      </el-table-column>
      <el-table-column prop="bondName" label="债券">
      </el-table-column>
      <el-table-column prop="province" label="省份">
      </el-table-column>
      <el-table-column prop="trade" label="行业">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <div style="display: inline-block;cursor:  pointer;"  @click="handleClickquery(scope.row)"><el-tag type="success" >查看</el-tag></div>
          <div style="display: inline-block;cursor:  pointer;" @click="handleClickupdate(scope.row)"> <el-tag type="info"   >修改</el-tag></div>
</template>
    </el-table-column>
  </el-table>
  <el-pagination 
      @current-change="handleCurrentChange"  
  class="page"
  :page-size=10
  background
  :current-page.sync="currpage"
  layout="prev, pager, next"
  :total=Number(total)>
</el-pagination>
    </div>
</template>

<script>
  import {
    getCookie
  } from "../../api/util";
  import {
    port
  } from '../../config/port'
  export default {
    created() {
      this.isHasToken();
      //this.menu = menu;
      axios({
        method: "get",
        url: port.test + "v1/creditRating/reportList",
        headers: {
          Authorization: "bearer " +
            getCookie('Token')
        },
        params: {
          userName: getCookie("currentUserId"),
          publisher: "",
          bondName: "",
          startTime: "",
          endTime: "",
          pageNum: 1,
          pageSize: 10
        }
      }).then(res => {
        if (res.data.status == 401) {
          this.$message({
            message: "token过期"
          });
          removeCookie('Token')
          removeCookie('currentUserId')
          removeCookie('DepartmentId')
  
          this.$router.push("/login");
        }
        this.total = Number(res.data.data.total);
        this.tableData = res.data.data.list;
      }).catch((error) => {
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
    },
    methods: {
      isHasToken() {
        if (!getCookie("Token")) {
          removeCookie('Token')
          removeCookie('currentUserId')
          removeCookie('DepartmentId')
  
          this.$router.push("/login");
        }
      },
      search() {
        console.log(this.$refs.data.value);
        let params;
        if (!this.$refs.data.value) {
          params = {
            userName: getCookie("currentUserId"),
            publisher: this.$refs.issuer.value || "",
            bondName: this.$refs.bond.value || "",
            startTime: "",
            endTime: "",
            pageNum: "1",
            pageSize: "10"
          };
        } else {
          params = {
            userName: getCookie("currentUserId"),
            publisher: this.$refs.issuer.value || "",
            bondName: this.$refs.bond.value || "",
            startTime: this.$refs.data.value[0],
            endTime: this.$refs.data.value[1],
            pageNum: "1",
            pageSize: "10"
          };
        }
        axios({
          method: "get",
          url: port.test + "v1/creditRating/reportList",
          headers: {
            Authorization: "bearer " +
              getCookie('Token')
          },
          params: params
        }).then(res => {
          if (res.data.status == 401) {
            this.$message({
              message: "token过期"
            });
            removeCookie('Token')
            removeCookie('currentUserId')
            removeCookie('DepartmentId')
  
            this.$router.push("/login");
  
          }
          this.currpage = 1;
          this.total = Number(res.data.data.total);
          this.tableData = res.data.data.list;
        }).catch((error) => {
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
      },
  
      handleCurrentChange(val) {
        console.log(`当前页:` + val);
        let params;
        if (!this.$refs.data.value) {
          params = {
            userName: getCookie("currentUserId"),
            publisher: this.$refs.issuer.value || "",
            bondName: this.$refs.bond.value || "",
            startTime: "",
            endTime: "",
            pageNum: val,
            pageSize: "10"
          };
        } else {
          params = {
            userName: getCookie("currentUserId"),
            publisher: this.$refs.issuer.value || "",
            bondName: this.$refs.bond.value || "",
            startTime: this.$refs.data.value[0],
            endTime: this.$refs.data.value[1],
            pageNum: val,
            pageSize: "10"
          };
        }
        axios({
          method: "get",
          url: port.test + "v1/creditRating/reportList",
          headers: {
            Authorization: "bearer " +
              getCookie('Token')
          },
          params: params
        }).then(res => {
          if (res.data.status == 401) {
            this.$message({
              message: "token过期"
            });
            removeCookie('Token')
            removeCookie('currentUserId')
            removeCookie('DepartmentId')
  
            this.$router.push("/login");
          }
          this.total = Number(res.data.data.total);
          this.tableData = res.data.data.list;
        }).catch((error) => {
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
      },
  
      querySearchAsync1(queryString, cb) {
        if (queryString) {
          axios({
            method: "get",
            url: port.test + "v1/creditRating/publisherList",
            headers: {
              Authorization: "bearer " +
                getCookie('Token')
            },
            params: {
              userName: getCookie("currentUserId"),
              publisher: queryString
            }
          }).then(res => {
            if (res.data.status == 401) {
              this.$message({
                message: "token过期"
              });
              removeCookie('Token')
              removeCookie('currentUserId')
              removeCookie('DepartmentId')
  
              this.$router.push("/login");
  
            }
            console.log(res.data.data, "res");
  
            let arr = [];
            for (let item of res.data.data) {
              let obj = {
                value: ""
              };
              obj.value = item;
              arr.push(obj);
            }
            console.log(arr);
            this.restaurants = arr;
            var restaurants = this.restaurants;
            var results = restaurants;
  
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(results);
            }, 3000 * Math.random());
          });
        }
      },
  
      handleSelect1(item) {
        this.$refs.issuer.value = item.value;
        this.search();
      },
  
      querySearchAsync2(queryString, cb) {
        if (queryString) {
          axios({
            method: "get",
            url: port.test + "v1/creditRating/bondNameList",
            headers: {
              Authorization: "bearer " +
                getCookie('Token')
            },
            params: {
              userName: getCookie("currentUserId"),
              publisher: this.$refs.issuer.value,
              bond: queryString
            }
          }).then(res => {
            if (res.data.status == 401) {
              this.$message({
                message: "token过期"
              });
              removeCookie('Token')
              removeCookie('currentUserId')
              removeCookie('DepartmentId')
  
              this.$router.push("/login");
            }
            let arr = [];
            for (let item of res.data.data) {
              let obj = {
                value: ""
              };
              obj.value = item.bondName;
              arr.push(obj);
            }
            this.restaurants = arr;
            var restaurants = this.restaurants;
            var results = restaurants;
  
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(results);
            }, 3000 * Math.random());
          }).catch((error) => {
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
  
      handleSelect2(item) {
        this.$refs.bond.value = item.value;
        this.search();
      },
  
      handleClickupdate(row) {
        this.$router.push(`/NewCredit?id=${row.id}`);
      },
      handleClickquery(row) {
        this.$router.push(`/EditCredit?id=${row.id}`);
      },
      createStateFilter(queryString) {
        return state => {
          return (
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      }
    },
  
    data() {
      return {
        currpage: 1,
        restaurants: [],
        state1: "",
        state2: "",
        timeout: null,
        total: "",
        pickerOptions2: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        value1: "",
        value2: "",
        form: {
          name: Number
        },
        tableData: [],
        list1: [],
        list2: [],
        value1: "",
        value2: "",
        value3: "",
        loading: false,
        options1: [],
        options2: [],
        value2: [],
        value8: [],
        value11: []
      };
    }
  };
</script>

<style scoped>
  .page {
    text-align: right;
    margin-top: 15px;
  }
  
  .btn {
    margin-left: 20px;
  }
</style>

