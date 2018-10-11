<template>
  <div :class="['side-bar']">
    <v-navi :model="menu" />
  </div>
</template>

<script>
import { format } from "@/shared/common/utils";
import { routes } from "../../router";
import vNavi from "./navi.vue";

export default {
  data() {
    return {
      menu: []
    };
  },
  components: {
    vNavi
  },
  created() {
    const UserDetail = JSON.parse(sessionStorage.getItem('loginInfo')).data.UserDetail;
    console.log(UserDetail,'UserDetail')
    sessionStorage.setItem("UserId",JSON.parse(UserDetail).UserId);
    // var dataInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    sessionStorage.setItem("currentUserId", JSON.parse(UserDetail).UserId);
    sessionStorage.setItem("currentRoleId", JSON.parse(UserDetail).RoleId);
    const _this =this;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer " +
          JSON.parse(sessionStorage.getItem("loginInfo")).data.access_token
      },
      url:
        "http://10.21.10.96:8080/privilegeManagement/" +
        sessionStorage.getItem("UserId") +
        "/GetPUserPrivilegeConfigByUserId",
      data: JSON.stringify({
        Account: sessionStorage.getItem("UserId"), //用户名
        SessionId: "",
        Token: JSON.parse(sessionStorage.getItem("loginInfo")).data
          .access_token,
        MothodName: "GetPUserPrivilegeConfigByUserId",
        TimeStamp: format(),
        VersionNum: "1.0.0.0",
        JosnParamBody: JSON.stringify({
          m_UserId: sessionStorage.getItem("currentUserId"),
          m_SystemId: "DemoSysIdentifier"
        })
      })
    })
      .then((res) => {
        console.log(JSON.parse(res.data.Result.JosnParamBody), "999999999");
        JSON.parse(res.data.Result.JosnParamBody).map(function(item) {
          if (item.FunctionKey == "MenuKey") {
            const MenuData = JSON.parse(item.Privilege).data;
            var s = JSON.parse(item.Privilege).echo;
            console.log(s);
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
                  hiddenArr.push(MenuData[item].children[changeHidden].hidden);
                  MenuData[item].hidden = true;
                  MenuData[item].children[changeHidden].hidden = true;
                } else {
                  MenuData[item].children[changeHidden].hidden = false;
                }
              }
            }
            console.log(
              parentArr,
              "parentArrparentArrparentArrparentArrparentArrparentArrparentArr"
            );
            console.log(hiddenArr, "hiddenArr%%%%%%%%%%%%%%@@@@@@@@@@");
            console.log(MenuData, "MenuData%%%%%%%%%%%%%%@@@@@@@@@@");
            _this.menu = MenuData;
            console.log(_this,'thisis')
          } else if (item.FunctionKey == "ButtonKey") {
            console.log(JSON.parse(item.Privilege).echo,'JSON.parse(item.Privilege).echo')
            sessionStorage.setItem(
              "ButtonKey",
              JSON.parse(item.Privilege).echo
            );
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style lang="sass">
  @import "../../../shared/styles/_variable"
  .side-bar
    position: fixed
    transition: all
    transition-duration: 300ms
    height: calc(100% - 80px)
    color: $color_side_bar
    width: $l_sidebar_width_normal
    overflow-y: auto
    box-shadow: $--box-shadow
    z-index: 10
    .el-menu
      height: 100%
</style>
