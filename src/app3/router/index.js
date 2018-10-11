
import Vue from 'vue'
import Router from 'vue-router'
import module1Routes from './module1'
import module2Routes from './module2'

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
    children: [module1Routes,module2Routes]
  },
   {
    path: '*',
    name: 'login',
    meta: { auth: false }, // 无需登录即可访问
    component: resolve => require(['../pages/login'], resolve)
  },
  {
    path: '/LookPage', //预览信评报告
    name: 'LookPage',
    component: resolve => require(['../pages/LookPage'], resolve)
  },
    {
      path: '/CreateCredit', //创建信评报告
      name: 'CreateCredit',
      component: resolve => require(['../pages/CreateCredit'], resolve)
    }, {
      path: '/EditCredit', //查看信评报告
      name: 'EditCredit',
      component: resolve => require(['../pages/EditCredit'], resolve)
    }, {
    path: '/NewCredit', //修改信评报告
    name: 'NewCredit',
    component: resolve => require(['../pages/NewCredit'], resolve)
  }
]

export default new Router({
  routes
})
