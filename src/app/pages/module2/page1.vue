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


    <el-table-column label="关联角色" width="100" filter-placement="bottom-end">
      <template slot-scope="scope">
              <div >
              <el-tag type="success"
                close-transition v-if ="scope.row.RoleId == 1 ">
                超级管理员
              </el-tag>
              <el-tag type="info"
                close-transition v-if ="scope.row.RoleId == 2 ">
                普通用户
              </el-tag>
            </div>
            </template>
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
import {
  format
} from '@/shared/common/utils'
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
export default {

  data() {
    return {
      RoleKeys: [],
      acccoutBtn: true,
      accRoleId: '',
      seachAccountValue: '',
      form: {
        sex: '',
        name: ''
      },
      formLabelWidth: '60px',
      tableData: []
    }
  },
  created() {
    sessionStorage.getItem('menudata');
    const _this = this;
    const UserDetail  = JSON.parse(sessionStorage.getItem('loginInfo')).data.UserDetail;
    const UserId = JSON.parse(UserDetail).UserId;
    sessionStorage.setItem('UserId',UserId);
    axios({
        method: 'post',
         headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
        },
        url: 'http://10.21.10.96:8080/privilegeManagement/' + sessionStorage.getItem('UserId') + '/GetPUsersBySystemId',
        data: JSON.stringify({
          "Account":sessionStorage.getItem('UserId') , //用户名
          "SessionId": "",
          "Token": JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
          "MothodName": "GetPUsersBySystemId",
          "TimeStamp": format(),
          "VersionNum": "1.0.0.0",
          "JosnParamBody": JSON.stringify({
            'm_SysId': 'DemoSysIdentifier'
          })
        }),
      }).then((response) => {
        if (response.data.Result.ResultCode == 0) {
          this.tableData = JSON.parse(response.data.Result.JosnParamBody);
        } else {
          this.showLoadding = false;
          this.$message({
            message: response.data.Result.ErrorMessage,
            type: 'warning'
          });
        }
      })
      .catch(function(error) {
        // console.log(_this);
        // _this.$router.push({
        //   path: '/Error'
        // })
      });
  },
   mounted(){
    this.authRequest();
   },
  methods: {
   authRequest() {
      let btnAuth = sessionStorage.getItem('ButtonKey');
      console.log(btnAuth,'btnAuthbtnAuth')
      btnAuth = btnAuth.split(',');
      if(btnAuth.length==0){
         this.acccoutBtn = true;
      }else{
  for (let i = 0; i < btnAuth.length; i++) {
        switch (btnAuth[i]) {
          case '11':
            this.acccoutBtn = false;
            break;
        }
      }
      }
    },
    seachAccount() {
      //1  获取参数
      //2  发送参数
      var _this = this;
      axios({
          method: 'post',
            headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
        },
          url: 'http://10.21.10.170:9186' + '/grain/IPrivilegeControlGrain/' + sessionStorage.getItem('UserId') + '/GetPUsersPageData',
          data: JSON.stringify({
            "Account": sessionStorage.getItem('UserId'), //用户名
            "SessionId": "",
            "Token": JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
            "MothodName": "GetPUsersPageData",
            "TimeStamp": format(),
            "VersionNum": "1.0.0.0",
            "JosnParamBody": JSON.stringify({
              'm_Pagesize': '1000',
              'm_Pageindex': '1',
              'm_Name': this.seachAccountValue,
              'm_SysId': 'DemoSysIdentifier'
            })
          }),
        }).then((response) => {
          if (response.data.Result.ResultCode == 0) {
            this.tableData = JSON.parse(response.data.Result.JosnParamBody);
          } else {
            this.showLoadding = false;
            this.$message({
              message: response.data.Result.ErrorMessage,
              type: 'warning'
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/roleToAccount?roleIds=' + row.RoleId
      });
    },
    handleEdit1(index, row) {
      sessionStorage.removeItem('curID');
      this.$router.push({
        path: '/module2/menuAuth?accountId=' + row.UserId
      });
    },
    handleEdit2(index, row) {
      sessionStorage.removeItem('curID');
      this.$router.push({
        path: '/module2/btnAuth?accountId=' + row.UserId
      });
    },
  }
}
</script>

<style>

</style>
