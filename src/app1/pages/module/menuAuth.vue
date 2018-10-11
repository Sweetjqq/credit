

<template >
<div class="" style="height:100%">
   <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 35px">
    <el-breadcrumb-item>系统配置</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>  
    <el-breadcrumb-item>菜单权限</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row style="text-align:  right;">
    <el-button type="primary" @click="save()">修改权限记录</el-button>
  </el-row>

  <el-col :span="11">
    <div class="block">
      <el-tree style="padding-top: 20px;padding-bottom:20px;" ref="tree2" :data="MenuKey" show-checkbox node-key="id" :default-checked-keys='checked'>

      </el-tree>
    </div>
  </el-col>
</div>
</template>


<script>
import { getCookie } from "../../api/mUtils";

import { getApi } from "../../api/index";
import { MenuKey } from "../../api/authKey.js";
import { format, parseUrl } from "@/shared/common/utils";
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
    this.isHasToken();
    this.render();
  },
  mounted() {
    const queryObj = {};
    sessionStorage.setItem("roleId", parseUrl(queryObj).roleId);
  },
  methods: {
    render() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), "sss");
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem("curID", i);
      sessionStorage.setItem("accountId", parseUrl(queryObj).accountId);
      sessionStorage.setItem("roleId", parseUrl(queryObj).roleId);
      if (sessionStorage.getItem("curID") == "accountId") {
        this.getUserMenu();
      } else if (sessionStorage.getItem("curID") == "roleId") {
        this.getRoleMenu();
      }
    },

    save() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), "sss");
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem("curID", i);
      sessionStorage.setItem("roleId", parseUrl(queryObj).roleId);
      sessionStorage.setItem("accountId", parseUrl(queryObj).accountId);

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
        echo: echo.join(","),
        data: MenuKey
      });
      console.log(this.menudata, "this.menudata");
      //用户保存菜单权限
      if (sessionStorage.getItem("curID") == "accountId") {
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
      console.log(parseUrl(queryObj), "sss");
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem("curID", i);
      sessionStorage.setItem("accountId", parseUrl(queryObj).accountId);
      sessionStorage.setItem("roleId", parseUrl(queryObj).roleId);
      const _this = this;
      //获取用户权限=======================================================================
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/GetPUserPrivilegeConfigByUserId",
        params: {
          AccountId:  getCookie("Account"),
          m_UserId: sessionStorage.getItem("accountId"),
          m_SystemId: "DemoSysIdentifier"
        }
      }).then(res => {
        let flag = true;
        if (
          res.data.ReturnParam == null ||
          res.data.ReturnParam.$values.length == 0
        ) {
          _this.MenuKey = MenuKey;
          _this.addUserMenu();
        } else {
          res.data.ReturnParam.$values.map(function(item) {
            if (item.FunctionKey == "MenuKey") {
              _this.checked = JSON.parse(item.Privilege).echo.split(",");
              _this.MenuKey = JSON.parse(item.Privilege).data;
            } else {
              flag = false;
              return flag;
            }
          });
          if (flag) {
            return;
          } else {
            _this.MenuKey = MenuKey;
            _this.addUserMenu();
            flag = true;
          }
        }
      });
      //获取用户权限================================================================================================
    },

    addUserMenu() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), "sss");
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem("curID", i);
      sessionStorage.setItem("roleId", parseUrl(queryObj).roleId);
      let echo = this.$refs.tree2.getCheckedKeys(); //回显的数组
      let nodes = this.$refs.tree2.getCheckedNodes(); //使用的dom
      let Arr = [];
      for (let item in nodes) {
        if (!nodes[item].children) {
          Arr.push(nodes[item]);
        }
      }
      this.menudata = JSON.stringify({
        echo: echo.join(","),
        data: MenuKey
      });
      //添加用户权限==========================================================================================
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/AddPUserPrivilegeConfig",
        data: {
          AccountId:  getCookie("Account"),
          SubParam: [
            {
              m_UserPConfig: {
                UserId: sessionStorage.getItem("accountId"),
                SystemId: "DemoSysIdentifier",
                FunctionKey: "MenuKey",
                Privilege: this.menudata,
                CreationTime: null
              }
            }
          ]
        }
      }).then(res => {});
      //添加用户权限==========================================================================================
    },

    editAccountMenu() {
      const queryObj = {};
      const arr = [];
      console.log(parseUrl(queryObj), "sss");
      let i;
      for (i in queryObj) {
        arr.push(i);
      }
      sessionStorage.setItem("curID", i);
      sessionStorage.setItem("roleId", parseUrl(queryObj).roleId);
      sessionStorage.setItem("accountId", parseUrl(queryObj).accountId);
      //编辑用户权限==========================================================================================
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/SetPUserPrivilegeConfig",
        data: {
          AccountId: getCookie("Account"),
          SubParam: [
            {
              m_UserPConfig: {
                UserId: sessionStorage.getItem("accountId"),
                SystemId: "DemoSysIdentifier",
                FunctionKey: "MenuKey",
                Privilege: this.menudata,
                CreationTime: null
              }
            }
          ]
        }
      }).then(res => {
        this.$message({
          message: "权限修改成功",
          type: "success",
          onClose:()=>{
               this.getAuth();
          }
        });
      });
      //编辑用户权限==========================================================================================
    },
    isHasToken() {
      if (!getCookie("Token")) {
        this.$router.push("/login");
      }
    },
      getAuth() {
      const _this = this;
      //获取用户权限==========================================================================================
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/GetPUserPrivilegeConfigByUserId",
        params: {
          AccountId: getCookie("Account"),
          m_UserId: getCookie("Account"),
          m_SystemId: "DemoSysIdentifier"
        }
      })
        .then(res => {
          console.log(res,'resresrsres');
          if (res.data.ResultCode == 200) {
            res.data.ReturnParam.$values.map(function(item) {
              if (item.FunctionKey == "MenuKey") {
                const MenuData = JSON.parse(item.Privilege).data;
                var s = JSON.parse(item.Privilege).echo;
                var ids = [];
                let hiddenArr = [];
                let parentArr = [];
                s = s.split(",");
                for (var i = 0; i < s.length; i++) {
                  ids.push(Number(s[i]));
                }
                for (let item in MenuData) {
                  for (let changeHidden in MenuData[item].children) {
                    //如果数组有json的ID
                    if (
                      ids.indexOf(MenuData[item].children[changeHidden].id) > -1
                    ) {
                      //新数组加入需要改变的
                      hiddenArr.push(
                        MenuData[item].children[changeHidden].hidden
                      );
                      MenuData[item].hidden = true;
                      MenuData[item].children[changeHidden].hidden = true;
                    } else {
                      MenuData[item].children[changeHidden].hidden = false;
                    }
                  }
                }
                sessionStorage.setItem("MenuKey", JSON.stringify(MenuData));
              } else if (item.FunctionKey == "ButtonKey") {
                sessionStorage.setItem(
                  "ButtonKey",
                  JSON.parse(item.Privilege).echo
                );
              }
              location.reload();
            });
          } else {
            this.$message({
              message: "获取用户权限失败",
              type: "warning"
            });
          }
        })
        .catch(function(error) {
          this.$message({
            message: "获取用户权限失败",
            type: error
          });
        });
      //获取用户权限==========================================================================================
    }
  }
};
</script>


<style scoped>
.el-tree {
  /* background: #f0f3f4; */
  /* border: 1px solid #f0f3f4; */
}
.el-checkbox__inner {
  margin-top: 10px !important;
}
</style>
