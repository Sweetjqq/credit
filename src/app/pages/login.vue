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
          //{
          // validator: createValidator([
          //   { expression: /1\d{10}$/, message: '请填写正确的手机号' }
          // ]),
          // trigger: "blur"
          //}
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    handleLoginClick() {
      this.$refs["form"].$children[0].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "http://10.21.10.96:8080/login",
            params: {
              username: this.form.username,
              password: this.form.password
            }
          })
            .then(res => {
              console.log(res,'ressss')
              if (res.status == 200) {
              //  console.log(JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token);
                console.log(JSON.stringify(res));
                sessionStorage.removeItem("loginInfo");
                sessionStorage.setItem("loginInfo", JSON.stringify(res));
                // authEnterPage();
                this.$store
                  .dispatch(authActionTypes.LOGIN, { ...this.form })
                  .then(() => {
                    this.$router.push("/module2/page1");
                  });
              } else {
               this.$message({
                  message: "登录失败",
                  type: "warning"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          return false;
        }
      });
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
