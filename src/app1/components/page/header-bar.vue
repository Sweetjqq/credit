<template>
    <div class="header">
        <el-row>
         
            <!--Logo area-->
            <el-col :xs="12" :sm="12" :md="8">
                <div class="logo">
                    <span class="logo_prefix">yzamc-demo</span>
                </div>
            </el-col>
            <!-- header right area-->
            <el-col :xs="24" :sm="12" :md="8">
                <div class="website">
                  <span class="logo_prefix"></span>
                </div>
            </el-col>

        <el-col :xs="1" :sm="1"  :md="{span:1,offset: 3}">
           <span>您好！{{userInfo}}</span>
        </el-col>
         <el-col :xs="8" :sm="8"  :md="{span:2}">
            <div class="user-header">
                <el-dropdown trigger="click" menu-align="start">

  <p id="time1" style="color: blueviolet;"></p>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >
                            <div class="setting-div">
                                <span class="setting-string" @click="showTime">个人中心</span> &nbsp;&nbsp;<i class="el-icon-edit"></i>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item divided>
                            <div class="setting-div">
                                <span class="setting-string" @click="exitFullscreen">基本设置</span> &nbsp;&nbsp;<i class="el-icon-setting"></i>
                            </div>
                      
                        </el-dropdown-item>
                        <el-dropdown-item divided >
                            <div class="setting-div" @click="handleSignoutClick">
                                <span class="setting-string"> 安全退出</span> &nbsp;&nbsp;<i class="el-icon-circle-close"></i>
                            </div>
                        </el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>
         </el-col>
        </el-row>
    </div>

</template>

<script>
import {removeCookie, getCookie} from '../../api/mUtils'
import { mapGetters } from "vuex";
import {
  getterTypes as userGetterTypes,
  actionTypes as authActionTypes
} from "../../store/auth/types";
import api from "../../api/auth";
import vButton from "@/shared/components/ui/button";
import {getApi} from '../../api/index'
export default {
  components: { vButton },
  data() {
    return {
      userInfo: ''
    };
  },
  created() {
    this.userInfo = getCookie('Account');
  },
    mounted(){
    setInterval(()=> {this.getCurrtime()},1000);
  },

  methods: {
      getCurrtime(){
        var a = new Date();
        var b = a.toLocaleTimeString();
        var c = a.toLocaleDateString();
        document.getElementById("time1").innerHTML = c+"&nbsp"+b;
     },
    requestFullScreen() {
      var de = document.documentElement;
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
    },
    exitFullscreen() {
      var de = document;
      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }
    },
    showTime() {
      //创建Date对象
      var today = new Date();
      //分别取出年、月、日、时、分、秒
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var seconds = today.getSeconds();
      //如果是单个数，则前面补0
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      //构建要输出的字符串
      var str =
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      //获取id=result的对象
      var obj = document.getElementById("result");
      //将str的内容写入到id=result的<div>中去
      obj.innerHTML = str;
      //延时器
      window.setTimeout("showTime()", 1000);
    },
    handleSignoutClick() {

    //登出==========================================================================================
      axios({
        method: "post",
        headers: {
          Authorization:
            "bearer " +
             getCookie('Token')
        },
        url:  getApi.api2+"/exit",
        params: {
          token: getCookie('Token')
        }
      })
        .then(res => {
          sessionStorage.removeItem("ButtonKey");
          sessionStorage.removeItem("MenuKey");
          sessionStorage.removeItem("UserId");
          sessionStorage.removeItem("accountId");
          sessionStorage.removeItem("curID");
          sessionStorage.removeItem("currentRoleId");
          sessionStorage.removeItem("currentUserId");
          sessionStorage.removeItem("loginInfo");
          sessionStorage.removeItem("roleId");
          removeCookie('Token');
          removeCookie('Account');
          this.$store.dispatch(authActionTypes.LOGOUT).then(() => {
            this.$router.replace("/login");
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    //登出==========================================================================================
        
    }
  }
};
</script>

<style scoped>
.website .name {
  color: #209e91 !important;
  font-size: 16px;
}
.header {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 66px;

  font-size: 14px;
  line-height: 66px;
  z-index: 1000;
  padding: 0 32px 0 40px;
  overflow: hidden;
}
.header .logo {
  float: left;
  cursor: pointer;
  font-size: 22px;
}

.logo_suffix {
  color: #fff;
}
.header .search {
  float: left;
  color: #fff;
  font-size: 14px;
}
.website span {
  display: inline-block;
  color: #209e91;
}
.website span:first-child {
  color: #fff;
}
.header-right {
  padding-top: 25px;
  line-height: 10px;
}
.header-right span {
  display: inline-block;
  margin-left: 14px;
  font-size: 18px;
  color: #fff;
  line-height: 1px;
  height: 18px;
  cursor: pointer;
}
.header-right span:hover {
  color: #209e91;
}
.user-header {
  line-height: 10px;
  padding-top: 7px;
  font-size: 12px;
}
.user-header img {
  border-radius: 50%;
  cursor: pointer;
}
.pop-image {
  display: block;
  float: left;
}
.pop-image img {
  border-radius: 50%;
}
.pop-div {
  height: 55px;
  clear: both;
}
.pop-content {
  display: block;
  font-size: 12px;
  line-height: 14px;
  padding-top: 15px;
  margin-left: 60px;
}
.pop-time {
  display: block;
  float: right;
  font-size: 10px;
  color: #ccc;
}
.pop-title {
  font-size: 12px;
  color: #209e91;
}
.task-div {
  clear: both;
  height: 55px;
}
.task-span {
  display: block;
  float: left;
  font-size: 12px;
}

.task-content {
  width: 160px;
  line-height: 16px;
  margin-left: 10px;
  padding: 5px;
}
.task-time {
  clear: both;
  float: right;
  color: #ccc;
}
.setting-div {
  height: 30px;
  line-height: 30px;
  clear: both;
}
.setting-div span {
  display: block;
  float: left;
  font-size: 12px;
}
.setting-icon {
  padding-top: 3px;
  padding-right: 3px;
}
</style>