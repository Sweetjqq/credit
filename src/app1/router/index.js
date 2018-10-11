import Vue from 'vue'
import Router from 'vue-router'
import module1Routes from './module1'
import module2Routes from './module2'
import module3Routes from './module3'



Vue.use(Router)

export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { auth: false }, // 无需登录即可访问
    component: resolve => require(['../pages/login'], resolve)
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['../pages/home'], resolve),
    children: [module1Routes, module2Routes, module3Routes]
  },{
    path: '*',
    name: 'login',
    meta: {
      auth: false
    }, // 无需登录即可访问
    component: resolve => require(['../pages/login'], resolve)
  }
]

export default new Router({
  routes
})
