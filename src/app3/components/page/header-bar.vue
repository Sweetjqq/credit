<template lang="pug">
.header-bar.d-flex.justify-content-between.align-items-center.h-100
  .header-logo
    img.mr-3(src="../../../../static/images/logo.png")
    img.mr-3(src="../../../../static/images/logoText.png" style="margin-left:8px;height:44px")
  .time  {{time}}
  .loginOut(@click="handleSignoutClick") 退出
  .personInfo 您好!
    span.username  {{currentUserId}}
    span.job &nbsp;&nbsp;[{{departName}}]
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getterTypes as userGetterTypes,
  actionTypes as authActionTypes
} from '../../store/auth/types'
import { port } from '../../config/port.js'
// import api from '../../api/auth'
import vButton from '@/shared/components/ui/button'
import {getCookie , removeCookie} from '../../api/util'
export default {
  components: { vButton },
  data() {
    return {
      // userInfo: {}
      time:'',
      currentUserId: getCookie('currentUserId'),
      departName: getCookie('departName')
    }
  },
  created(){
    this.departName = getCookie('departName')
  },
  mounted(){
    setInterval(()=> {this.getCurrtime()},1000);
  },
  // computed: {
  //   ...mapGetters({
  //     userInfo: userGetterTypes.USER_INFO
  //   })
  // },
  methods: {
      getCurrtime(){
        var a = new Date();
        var b = a.toLocaleTimeString();
        var c = a.toLocaleDateString();
        this.time = c+b;
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
        url:  port.test+'user/exit',
        params: {
          userName:getCookie('currentUserId'),
          token: getCookie('Token')
        }
      })
        .then(res => {
          console.log(res);
          console.log(res.data.status,'dengchu')
removeCookie('Token')
removeCookie('currentUserId')
removeCookie('DepartmentId')

          if(res.status == 200 ){
             this.$store.dispatch(authActionTypes.LOGOUT).then(() => {
               this.$router.replace("/login");
             });
          }else{
             this.$message({
               message: '退出失败',
            });
          }
        })


    //登出==========================================================================================
    }
  }
}
</script>

<style lang="sass" scoped>
.header-bar
  padding-top: 10px
  img
    height: 48px
    padding-top: 20px
  .time
    color: #c4dde3
    float: right
    height: 80px
    line-height: 110px
    font-size: 14px
    width: 160px
  .loginOut
    color #a2e4f2
    cursor: pointer
    float: right
    width: 60px
    line-height: 30px
    color: white
    font-size: 14px
  .personInfo
    font-weight: 700
    color: #25606d
    line-height: 30px
    width: 200px
    font-size: 14px
    height: 80px
    float: right
    .username
      color: #c8161d
.header-logo
  float: left
  margin-left: 10px
  position: relative
  width: 220px
  height: 58px
  text-align: left
  line-height: 58px
  overflow: hidden
  font-size: 24px
  .logo-image
    height: 100%
    padding: 10px
</style>
