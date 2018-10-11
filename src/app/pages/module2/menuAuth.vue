

<template >
<div class="" style="height:100%">
  <el-row style="text-align:  right;">
    <el-button type="primary" @click="save()">修改权限记录</el-button>
  </el-row>

  <el-col :span="11" :offset="1">
    <div class="block">
      <span class="">
      菜单权限
    </span>
      <el-tree style="padding-top: 20px;padding-bottom:20px;" ref="tree2" :data="MenuKey" show-checkbox node-key="id" :default-checked-keys='checked'>

      </el-tree>
    </div>
  </el-col>
</div>
</template>


<script>
import {
  MenuKey
} from '../../api/authKey.js';
import {
  format,
  parseUrl
} from "@/shared/common/utils";
export default {
  data() {
    return {
      currData: MenuKey,
      arr: [],
      keys: [],
      MenuKey: [],
      menudata: {},
      checked: []
    };
  },
  created() {
    this.render();
  },
  mounted() {
    const queryObj = {};
    sessionStorage.setItem('roleId', parseUrl(queryObj).roleId);
  },
  methods: {
    render() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), 'sss');
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem('curID', i);
      sessionStorage.setItem('accountId', parseUrl(queryObj).accountId);
      sessionStorage.setItem('roleId', parseUrl(queryObj).roleId);
      if (sessionStorage.getItem('curID') == 'accountId') {
        this.getUserMenu();
      } else if (sessionStorage.getItem('curID') == 'roleId') {
        this.getRoleMenu();
      }
    },

    save() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), 'sss');
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem('curID', i);
      sessionStorage.setItem('roleId', parseUrl(queryObj).roleId);
      sessionStorage.setItem('accountId', parseUrl(queryObj).accountId);

      let echo = this.$refs.tree2.getCheckedKeys(); //回显的数组
      // console.log(echo,'shabi');
      let nodes = this.$refs.tree2.getCheckedNodes(); //使用的dom
      let Arr = [];
      for (let item in nodes) {
        if (!nodes[item].children) {
          Arr.push(nodes[item]);
        }
      }
      this.menudata = JSON.stringify({
        "echo": echo.join(','),
        "data": MenuKey
      })
      console.log(this.menudata, 'this.menudata');
      //用户保存菜单权限
      if (sessionStorage.getItem('curID') == 'accountId') {
        this.editAccountMenu();
      }
      //角色保存菜单权限
      // else if (sessionStorage.getItem('curID') == 'roleId') {
      //   this.editRoleMenu();
      // }
    },

    getUserMenu() {

      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), 'sss');
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem('curID', i);
      sessionStorage.setItem('accountId', parseUrl(queryObj).accountId);
      sessionStorage.setItem('roleId', parseUrl(queryObj).roleId);
      const _this = this;
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
        },
        url: 'http://10.21.10.96:8080/privilegeManagement/' + sessionStorage.getItem('UserId') + '/GetPUserPrivilegeConfigByUserId',
        data: JSON.stringify({
          "Account": sessionStorage.getItem('UserId'), //用户名
          "SessionId": "",
          "Token": JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
          "MothodName": "GetPUserPrivilegeConfigByUserId",
          "TimeStamp": format(),
          "VersionNum": "1.0.0.0",
          "JosnParamBody": JSON.stringify({

            "m_UserId": sessionStorage.getItem('accountId'),
            "m_SystemId": "DemoSysIdentifier"
          })
        }),
      }).then((res) => {
        console.log(JSON.parse(res.data.Result.JosnParamBody), '111');
        let flag = true;
        if (JSON.parse(res.data.Result.JosnParamBody) == null || JSON.parse(res.data.Result.JosnParamBody).length == 0) {
          //如果是空结果
          _this.MenuKey = this.currData;
          _this.addUserMenu();
        } else {
          JSON.parse(res.data.Result.JosnParamBody).map(function(item) {
            if (item.FunctionKey == "MenuKey") {
              _this.checked = JSON.parse(item.Privilege).echo.split(',');
              _this.MenuKey = JSON.parse(item.Privilege).data;
            } else {
              flag = false
              return flag
            }
          });
          if (flag) {
            return
          } else {
            _this.MenuKey = MenuKey;
            _this.addUserMenu();
            flag = true;
          }
        }
      })
    },
   
    addUserMenu() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), 'sss');
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem('curID', i);
      sessionStorage.setItem('roleId', parseUrl(queryObj).roleId);
      let echo = this.$refs.tree2.getCheckedKeys(); //回显的数组
      let nodes = this.$refs.tree2.getCheckedNodes(); //使用的dom
      let Arr = [];
      for (let item in nodes) {
        if (!nodes[item].children) {
          Arr.push(nodes[item]);
        }
      }
      this.menudata = JSON.stringify({
        "echo": echo.join(','),
        "data": MenuKey
      })
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
        },
        url:'http://10.21.10.96:8080/privilegeManagement/'+ sessionStorage.getItem('UserId') + '/AddPUserPrivilegeConfig',
        data: JSON.stringify({
          "Account": sessionStorage.getItem('UserId'), //用户名
          "SessionId": "",
          "Token": JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
          "MothodName": "AddPUserPrivilegeConfig",
          "TimeStamp": format(),
          "VersionNum": "1.0.0.0",
          "JosnParamBody": JSON.stringify({
            'm_UserPConfig': {
              'UserId': sessionStorage.getItem('accountId'),
              "SystemId": "DemoSysIdentifier",
              'FunctionKey': 'MenuKey',
              'Privilege': this.menudata,
              'CreationTime': ''
            }
          })
        }),
      }).then((res) => {
        console.log(res.data.Result.JosnParamBody, "获取角色数据列表");
      })
    },
    
    editAccountMenu() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), 'sss');
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem('curID', i);
      sessionStorage.setItem('roleId', parseUrl(queryObj).roleId);
      sessionStorage.setItem('accountId', parseUrl(queryObj).accountId);
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
        },
        url: 'http://10.21.10.96:8080/privilegeManagement/'+ sessionStorage.getItem('UserId') + '/SetPUserPrivilegeConfig',
        data: JSON.stringify({
          "Account": sessionStorage.getItem('UserId'), //用户名
          "SessionId": "",
          "Token": JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
          "MothodName": "SetPUserPrivilegeConfig",
          "TimeStamp": format(),
          "VersionNum": "1.0.0.0",
          "JosnParamBody": JSON.stringify({
            'm_UserPConfig': {
              'UserId': sessionStorage.getItem('accountId'),
              "SystemId": "DemoSysIdentifier",
              'FunctionKey': 'MenuKey',
              'Privilege': this.menudata,
              'CreationTime': ''
            }
          })
        }),
      }).then((res) => {
        this.$message({
          message: '权限修改成功',
          type: 'success'
        });
      })
    }

  }

};
</script>


<style scoped>
.el-tree {
  /* background: #f0f3f4; */
  /* border: 1px solid #f0f3f4; */
}
.el-checkbox__inner{
  margin-top: 10px !important;
}
</style>
