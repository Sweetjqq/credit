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

        <el-col :xs="1" :sm="1"  :md="{span:1,offset: 5}">
           <div> {{userInfo}}</div>
        </el-col>
         <el-col :xs="8" :sm="8"  :md="{span:2}">
            <div class="user-header">
                   
                <el-dropdown trigger="click" menu-align="start">
                    <img src="../../assets/1.gif" width="50px" />
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >
                            <div class="setting-div">
                                <span class="setting-string">个人中心</span> &nbsp;&nbsp;<i class="el-icon-edit"></i>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item divided>
                            <div class="setting-div">
                                <span class="setting-string">基本设置</span> &nbsp;&nbsp;<i class="el-icon-setting"></i>
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
import { mapGetters } from "vuex";
import {
  getterTypes as userGetterTypes,
  actionTypes as authActionTypes
} from "../../store/auth/types";
// import api from '../../api/auth'
import vButton from "@/shared/components/ui/button";

export default {
  components: { vButton },
  data() {
    return {
      userInfo: sessionStorage.getItem("UserId")
    };
  },

  methods: {
    handleSignoutClick() {
      axios({
        method: "post",
        headers: {
          Authorization: "bearer " + JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token
        },
        url: 'http://10.21.10.96:8080/exit',
        params: {
          token: JSON.parse(sessionStorage.getItem('loginInfo')).data.access_token
        }
      })
        .then(res => {
          this.$store.dispatch(authActionTypes.LOGOUT).then(() => {
            this.$router.replace("/login");
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
    .website .name{
      color: #209e91!important;
      font-size: 16px;
    }
    .header {
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        height:66px;

        font-size: 14px;
        line-height: 66px;
        z-index:1000;
        padding:0 32px 0 40px;
        overflow:hidden;

    }
    .header .logo{
        float: left;
        cursor:pointer;
        font-size: 22px;
    }
    
    .logo_suffix{
        color:#fff;
    }
    .header .search{
        float: left;
        color:#fff;
        font-size:14px;
    }
    .website span{
        display:inline-block;
        color:#209e91;
    }
    .website span:first-child{
        color:#fff;
    }
    .header-right{
        padding-top:25px;
        line-height:10px;
    }
    .header-right span{
        display:inline-block;
        margin-left:14px;
        font-size:18px;
        color:#fff;
        line-height:1px;
        height:18px;
        cursor:pointer;

    }
    .header-right span:hover{
        color:#209e91;

    }
    .user-header{
        line-height:10px;
        padding-top:7px;
        font-size:12px;
    }
    .user-header img{
        border-radius:50%;
        cursor:pointer;
    }
    .pop-image{
        display:block;
        float:left;
    }
    .pop-image img{
        border-radius:50%;
    }
    .pop-div{
        height:55px;
        clear:both;
    }
    .pop-content{
        display:block;
        font-size:12px;
        line-height:14px;
        padding-top:15px;
        margin-left:60px;
    }
    .pop-time{
        display:block;
        float:right;
        font-size:10px;
        color:#ccc;

    }
    .pop-title{
        font-size:12px;
        color:#209e91;
    }
    .task-div{
        clear:both;
        height:55px;
    }
    .task-span{
        display:block;
        float:left;
        font-size:12px
    }

    .task-content{
        width:160px;
        line-height:16px;
        margin-left:10px;
        padding:5px;
    }
    .task-time{
        clear:both;
        float:right;
        color:#ccc;

    }
    .setting-div{
        height:30px;
        line-height:30px;
        clear:both;
    }
    .setting-div span{
        display:block;
        float:left;
        font-size:12px;
    }
    .setting-icon{
        padding-top:3px;
        padding-right:3px;
    }



</style>