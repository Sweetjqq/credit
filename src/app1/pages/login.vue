<template lang="pug">
.admin-login
  h1 管理员登录
  v-form(label-width="80px" :model="form" :rules="rules" ref="form")
    v-input(label="账户名" type="text" v-model="form.username" @keyup.enter.native="handleLoginClick(form)" placeholder="请输入账户名" :maxlength="11" prop="username")
    v-input(label="密码" type="password" v-model="form.password" @keyup.enter.native="handleLoginClick(form)" placeholder="请输入密码" :maxlength="6" prop="password")
  v-button(@click="handleLoginClick" type="primary" text="登录" :autofocus="true")
</template>

<script>
import api from "../api/auth";
import { createValidator } from "@/shared/common/utils";
import { actionTypes as authActionTypes } from "../store/auth/types";
import { format } from "@/shared/common/utils";
import { getApi } from "../api/index";
import { getCookie, removeCookie, setCookie } from "../api/mUtils";
export default {
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      rules: {
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (getCookie("Token")) {
        sessionStorage.setItem("LoginOK","1");
      console.log(getCookie("Token"), "getCookieToken");
      this.getAuth();
      this.$store.dispatch(authActionTypes.LOGIN, { ...this.form }).then(() => {
        this.$router.push("/module1/list");
      });
    }
  },
  methods: {
    handleLoginClick() {
      this.$refs["form"].$children[0].validate(valid => {
        if (valid) {
          //登录==========================================================================================
          axios({
            method: "post",
            url: getApi.api2 + "/login",
            //  url:'http://10.21.10.96:8080/login',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              username: this.form.username,
              password: this.form.password
            },
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ]
            // data: 'username='+this.form.username+'&password='+this.form.password
          })
            .then(res => {
              console.log(res.data.access_token, ";access_token");
              if (res.status == "error") {
                this.$message({
                  message: "登录失败",
                  type: "warning"
                });
              } else {
                sessionStorage.removeItem("loginInfo");
                sessionStorage.setItem("loginInfo", JSON.stringify(res));
                // authEnterPage();
                const UserDetail = JSON.parse(
                  sessionStorage.getItem("loginInfo")
                ).data.UserDetail;
                const UserId = JSON.parse(UserDetail).UserId;
                sessionStorage.setItem("accountId", UserId);
                sessionStorage.setItem("UserId", UserId);
                setCookie("Token", res.data.access_token);
                setCookie("Account", UserId);
              

                sessionStorage.setItem("UserId", JSON.parse(UserDetail).UserId);
                sessionStorage.setItem(
                  "currentUserId",
                  JSON.parse(UserDetail).UserId
                );
                sessionStorage.setItem(
                  "currentRoleId",
                  JSON.parse(UserDetail).RoleId
                );
                this.getAuth();
              }
            })
            .catch(error => {
              this.$message({
                message: "登录失败",
                type: "warning"
              });
            });
          //登录==========================================================================================
        } else {
          return false;
        }
      });
    },
  getAuth(){
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
          if (res.data.ResultCode == 200) {
            res.data.ReturnParam.$values.map((item)=> {
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
                console.log(this.menu,"this.menu");
                console.log(this.menu,"this.menu");
                  this.$store
                  .dispatch(authActionTypes.LOGIN, { ...this.form })
                  .then(() => {
                    this.$router.push("/module1/list");
                  });
              } else if (item.FunctionKey == "ButtonKey") {
                sessionStorage.setItem(
                  "ButtonKey",
                  JSON.parse(item.Privilege).echo
                );
                
              }
              
            });
          } else {
            console.log("11111111111111");
          }
        })
        .catch(function(error) {});
    }
   
  }
};
</script>

<style lang="sass" scoped>
  h1
    font-weight: normal
    margin-bottom: 50px
  .admin-login
    padding-top: 100px
    text-align: center
    width: 280px
    margin: auto
</style>
