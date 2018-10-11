


<template >
<div class="" style="height:100%">
   <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 35px">
    <el-breadcrumb-item>系统配置</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>  
    <el-breadcrumb-item>按钮权限</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row style="text-align:  right;">
    <el-button type="primary" :disabled = "acccoutBtn" @click="save()">修改权限记录</el-button>
  </el-row>

  <el-col :span="11" >
    <div class="block">

      <el-tree style="margin-top: 20px;" ref="tree2" :data="ButtonKey" show-checkbox node-key="id" :default-checked-keys='checked'>


      </el-tree>
    </div>
  </el-col>

</div>
</template>


<script>
import { getApi } from "../../api/index";
import { ButtonKey } from "../../api/authKey.js";
import { format, parseUrl } from "@/shared/common/utils";
// import {
//   Cconfig,
//   Jconfig
// } from '../../config/index.js';
// import {
//   format,
//   parseUrl
// } from '../../config/mUtils.js';
import { getCookie } from "../../api/mUtils";

export default {
  data() {
    return {
      currData: ButtonKey,
      arr: [],
      ButtonKey: [],
      btndata: {},
      checked: [],
      keys: [],
       acccoutBtn: "",
    };
  },
  created() {
    this.isHasToken();
    this.render();
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
  },
  mounted() {
    const queryObj = {};
    sessionStorage.setItem("roleId", parseUrl(queryObj).roleId);
  },

  methods: {
    isHasToken() {
      if (!getCookie("Token")) {
        this.$router.push("/login");
      }
    },
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
      const _this = this;
      if (sessionStorage.getItem("curID") == "accountId") {
        this.getUserBtn();
      } else if (sessionStorage.getItem("curID") == "roleId") {
        this.getRoleBtn();
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
      let nodes = this.$refs.tree2.getCheckedNodes(); //使用的dom
      let Arr = [];
      for (let item in nodes) {
        if (!nodes[item].children) {
          Arr.push(nodes[item]);
        }
      }
      this.btndata = JSON.stringify({
        echo: echo.join(","),
        data: ButtonKey
      });
      console.log(this.btndata, "this.btndata");
      //用户保存菜单权限
      if (sessionStorage.getItem("curID") == "accountId") {
        this.editAccountBtn();
      }
      //角色保存菜单权限
    },

    getUserBtn() {
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
      //获取用户权限========================================================================
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/GetPUserPrivilegeConfigByUserId",
        params: {
          AccountId: getCookie("Account"),
          m_UserId: sessionStorage.getItem("accountId"),
          m_SystemId: "DemoSysIdentifier"
        }
      }).then(res => {
        let flag = true;
        if (
          res.data.ReturnParam == null ||
          res.data.ReturnParam.$values.length == 0
        ) {
          _this.ButtonKey = ButtonKey;
          _this.addUserBtn();
        } else {
          console.log(
            res.data.ReturnParam.$values,
            "***********(((((((((((((((((((((("
          );
          res.data.ReturnParam.$values.map(function(item) {
            if (item.FunctionKey == "ButtonKey" && item.Privilege == null) {
              _this.MenuKey = MenuKey;
              _this.addUserBtn();
            }
            if (item.FunctionKey == "ButtonKey") {
              _this.checked = JSON.parse(item.Privilege).echo.split(",");
              _this.ButtonKey = JSON.parse(item.Privilege).data;
            } else {
              flag = false;
              return flag;
            }
          });
          if (flag) {
            return;
          } else {
            _this.ButtonKey = ButtonKey;
            _this.addUserBtn();
            flag = true;
          }
        }
      });
      //获取用户权限=================================================================================================
    },
    addUserBtn() {
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
      this.btndata = JSON.stringify({
        echo: echo.join(","),
        data: ButtonKey
      });
      //添加用户权限============================================================================================
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/AddPUserPrivilegeConfig",
        data: {
          AccountId: getCookie("Account"),
          SubParam: [
            {
              m_UserPConfig: {
                UserId: sessionStorage.getItem("accountId"),
                SystemId: "DemoSysIdentifier",
                FunctionKey: "ButtonKey",
                Privilege: this.btndata,
                CreationTime: null
              }
            }
          ]
        }
      }).then(res => {});
      //添加用户权限=============================================================================================
    },
    editAccountBtn() {
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
      //编辑用户权限==============================================================================================
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + getCookie("Token")
        },
        url: getApi.api1 + "/SetPUserPrivilegeConfig",
        data: {
          AccountId:  getCookie("Account"),
          SubParam: [
            {
              m_UserPConfig: {
                UserId: sessionStorage.getItem("accountId"),
                SystemId: "DemoSysIdentifier",
                FunctionKey: "ButtonKey",
                Privilege: this.btndata,
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
      //编辑用户权限==================================================================================================
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
  background: #f0f3f4;
}
</style>
