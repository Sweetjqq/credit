<template lang="pug">
el-container
  el-header.app-header(height="80px")

    v-header-bar
  el-container.app-body(style="margin-top: 80px")
    el-aside(width="250px" style="z-index: 10")
      v-side-navi-bar
      vFooter
    el-main(style="margin-bottom:66px")
      router-view

</template>

<script>
import vSideNaviBar from "../components/page/side-navi-bar";
import vHeaderBar from "../components/page/header-bar";
import vFooter from "../components/page/footer";
import {getCookie} from '../api/mUtils';
import {getApi} from '../api/index'

export default {
  components: {
    vHeaderBar,
    vSideNaviBar,
    vFooter
  },
  created() {
  if(sessionStorage.getItem("LoginOK") == 1){
    this.getAuth();
    sessionStorage.setItem("LoginOK",0)
  }
  },

   methods:{
   
    getAuth() {
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
              } else if (item.FunctionKey == "ButtonKey") {
                sessionStorage.setItem(
                  "ButtonKey",
                  JSON.parse(item.Privilege).echo
                );
              }
            });
          location.reload();
          } else {
            console.log("11111111111111");
          }
        })
        .catch(function(error) {});
    }
  },

};
</script>

<style lang="sass">
@import "../../shared/styles/variable"
.app-header
  position: fixed
  left: 0
  right: 0
  z-index: 10
  background-color: $--color-primary
</style>
