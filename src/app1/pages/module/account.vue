<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 35px">
    <el-breadcrumb-item>系统配置</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
  <!--tableData-->

  <el-form ref="form" :inline="true" onsubmit="return false;">
    <el-form-item label="用户名称:" style="text-align:left;">
      <el-input placeholder="请输入账户名称" v-model="seachAccountValue" @keyup.enter.native="seachAccount(seachAccountValue)"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="seachAccount()">查询</el-button>

    </el-form-item>


  </el-form>

  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="UserId" label="账户名" width="">

    </el-table-column>
    <el-table-column prop="DepartmentId" label="部门" width="">

    </el-table-column>
    <el-table-column prop="RoleId" label="RoleId" width="">

    </el-table-column>
    <!-- SystemId -->
    <el-table-column prop="SystemId" label="SystemId" width="">

    </el-table-column>


    <el-table-column label="操作" width="350" align="center">
      <template slot-scope="scope">
                 <el-button size="mini" :disabled = "acccoutBtn" type="info"  @click="handleEdit1(scope.$index, scope.row)">菜单权限</el-button>
                <el-button size="mini" :disabled = "acccoutBtn" type="success"  @click="handleEdit2(scope.$index, scope.row)">按钮权限</el-button>
                 <!-- <el-button size="mini" :disabled = "acccoutBtn" type="waring"  @click="handleEdit(scope.$index, scope.row)">分配角色</el-button> -->
            </template>
    </el-table-column>
  </el-table>


</div>
</template>

<script>
import { format } from "@/shared/common/utils";
// import {
//   Cconfig,
//   Jconfig
// } from '../../config/index.js';
// import {
//   btnmaplist
// } from '../../config/authKey'
// import {
//   enterPage
// } from '../../common'
// import {
//   api
// } from '../../config/api.js';
import { getApi } from "../../api/index";
import { getCookie } from "../../api/mUtils";
export default {
  data() {
    return {
      RoleKeys: [],
      acccoutBtn: "",
      accRoleId: "",
      seachAccountValue: "",
      form: {
        sex: "",
        name: ""
      },
      formLabelWidth: "60px",
      tableData: []
    };
  },
  created() {
    this.isHasToken();
    console.log(getCookie("Token"), "sdfffffffffffff");
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + getCookie("Token")
      },
      url: getApi.api1 + "/GetPUsersBySystemId",
      params: {
        AccountId: getCookie("Account"),
        m_SysId: "DemoSysIdentifier"
      }
    })
      .then(response => {
        console.log(response.data, "##########################");
        if (response.data.ResultCode == 200) {
          const btnAuth = sessionStorage.getItem("ButtonKey");
          // console.log(btnAuth.split(","), "%%%%%%%%%%%%%%%%%");

          if (btnAuth.split(",").length > 0) {
            for (let item of btnAuth.split(",")) {
              console.log(item, "itemtietete");
              switch (item) {
                case "11":
                  this.acccoutBtn = false;
                  console.log("adsfsd1");
                  break;
                default:
                  this.acccoutBtn = true;
              }
            }
          } else {
            console.log("1$$$$$$$$$$$$$$$$");
          }

          this.tableData = response.data.ReturnParam.$values;
        } else {
          this.showLoadding = false;
          this.$message({
            message: "请求错误",
            type: "warning"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        // _this.$router.push({
        //   path: '/Error'
        // })
      });
  },
  mounted() {},
  methods: {
    isHasToken() {
      if (!getCookie("Token")) {
        this.$router.push("/login");
      }
    },
    authRequest() {
      if (btnAuth) {
        for (let i = 0; i < btnAuth.length; i++) {
          switch (btnAuth[i]) {
            case "11":
              this.acccoutBtn = false;
              break;
            default:
              this.acccoutBtn = true;
          }
        }
      } else {
        console.log("1$$$$$$$$$$$$$$$$");
      }
    },
    seachAccount() {
      //1  获取参数
      //2  发送参数
      var _this = this;

      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/GetPUsersPageData",
        params: {
          AccountId:  getCookie("Account"),
          m_SysId: "DemoSysIdentifier",
          m_Pagesize: "1000",
          m_Pageindex: "1",
          m_Name: this.seachAccountValue
        }
      })
        .then(response => {
          if (response.data.ResultCode == 200) {
            this.tableData = response.data.ReturnParam.$values;
          } else {
            this.showLoadding = false;
            this.$message({
              message: "请求出错",
              type: "warning"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/roleToAccount?roleIds=" + row.RoleId
      });
    },
    handleEdit1(index, row) {
      sessionStorage.removeItem("curID");
      this.$router.push({
        path: "/module/menuAuth?accountId=" + row.UserId
      });
    },
    handleEdit2(index, row) {
      sessionStorage.removeItem("curID");
      this.$router.push({
        path: "/module/btnAuth?accountId=" + row.UserId
      });
    }
  }
};
</script>

<style>

</style>
