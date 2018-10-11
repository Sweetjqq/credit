

<template >
<div class="" style="height:100%">
  <el-row style="text-align:  right;">
    <el-button type="primary" @click="save()">修改权限记录</el-button>
  </el-row>

  <el-col :span="11" :offset="1">
    <div class="block">
      <span class="">
      按钮权限
    </span>
      <el-tree style="margin-top: 20px;" ref="tree2" :data="ButtonKey" show-checkbox node-key="id" :default-checked-keys='checked'>


      </el-tree>
    </div>
  </el-col>

</div>
</template>


<script>
import {
  ButtonKey
} from '../../api/authKey.js';
import {
  format,
  parseUrl
} from "@/shared/common/utils";
// import {
//   Cconfig,
//   Jconfig
// } from '../../config/index.js';
// import {
//   format,
//   parseUrl
// } from '../../config/mUtils.js';

export default {
  data() {
    return {
      currData: ButtonKey,
      arr: [],
      ButtonKey: [],
      btndata: {},
      checked: [],
      keys: []
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
      const _this = this;
      if (sessionStorage.getItem('curID') == 'accountId') {
        this.getUserBtn();
      } else if (sessionStorage.getItem('curID') == 'roleId') {
        this.getRoleBtn();
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
      let nodes = this.$refs.tree2.getCheckedNodes(); //使用的dom
      let Arr = [];
      for (let item in nodes) {
        if (!nodes[item].children) {
          Arr.push(nodes[item]);
        }
      }
      this.btndata = JSON.stringify({
        "echo": echo.join(','),
        "data": ButtonKey
      })
      console.log(this.btndata, 'this.btndata');
      //用户保存菜单权限
      if (sessionStorage.getItem('curID') == 'accountId') {
        this.editAccountBtn();
      }
      //角色保存菜单权限
      
    },

    getUserBtn() {
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
          _this.ButtonKey = ButtonKey;
          _this.addUserBtn();
        } else {
          JSON.parse(res.data.Result.JosnParamBody).map(function(item) {
            if (item.FunctionKey == "ButtonKey") {
              _this.checked = JSON.parse(item.Privilege).echo.split(',');
              console.log(JSON.parse(item.Privilege).echo.split(','));
              _this.ButtonKey = JSON.parse(item.Privilege).data;
            } else {
              flag = false
              return flag
            }
          });
          if (flag) {
            return
          } else {
            _this.ButtonKey = ButtonKey;
            _this.addUserBtn();
            flag = true
          }

        }
      })
    },
    addUserBtn() {
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
      this.btndata = JSON.stringify({
        "echo": echo.join(','),
        "data": ButtonKey
      })
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token,
        },
        url: 'http://10.21.10.96:8080/privilegeManagement/' + sessionStorage.getItem('UserId') + '/AddPUserPrivilegeConfig',
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
              'FunctionKey': 'ButtonKey',
              'Privilege': this.btndata,
              'CreationTime': ''
            }
          })
        }),
      }).then((res) => {
        console.log(res.data.Result.JosnParamBody, "获取角色数据列表");
      })
    },
    editAccountBtn() {
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
        url:'http://10.21.10.96:8080/privilegeManagement/' + sessionStorage.getItem('UserId') + '/SetPUserPrivilegeConfig',
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
              'FunctionKey': 'ButtonKey',
              'Privilege': this.btndata,
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
  background: #f0f3f4;
}
</style>
