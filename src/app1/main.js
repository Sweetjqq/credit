// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import '../shared/filters'
// // register components
import '../shared/components'
import store from './store'
import App from './App'
import router from './router'
import { actionTypes as authActionTypes } from './store/auth/types'
import axios from 'axios'
Vue.prototype.axios = axios
require('es6-promise').polyfill()

Vue.use(ElementUI)

Vue.config.productionTip = false

// router.beforeEach(({ meta }, from, next) => {
//   console.log(to);
//   next();
//   let { auth = true } = meta

//   if (!sessionStorage.getItem('UserId')) {
//     store.dispatch(authActionTypes.IS_LOGIN).then(result => {
//       if (result) {
//         next()
//       } else {
//         // 未登录
//         next({
//           path: '/login'
//         })
//       }
//     })
//   } else {
//     next()
//   }
// })

// import {getCookie} from './api/mUtils'

// router.beforeEach((to, from, next) => {
//   if (getCookie("Token")) {
//     console.log("有Token，进行下一步操作");
//     next();
//   } else {
//     console.log("没有Token，跳到登录页");
//     next();
//     router.push('/Login');
//   }

// })

Vue.mixin({
  methods: {
    $success(message = '操作成功') {
      return this.$message({
        type: 'success',
        message
      })
    },

    $warn(message) {
      return this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
