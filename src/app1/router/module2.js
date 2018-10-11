export default {
  path: '/module',
  label: '系统设置',
  component: resolve =>
    require(['@/shared/components/page/place-holder'], resolve),
  name: 'module2',
  children: [
    {
      name: 'account',
      path: 'account',
      label: '用户管理',
      component: resolve => require(['../pages/module/account'], resolve)
    }, {
      name: 'menuAuth',
      path: 'menuAuth',
      component: resolve => require(['../pages/module/menuAuth'], resolve)
    }, {
      name: 'btnAuth',
      path: 'btnAuth',
      component: resolve => require(['../pages/module/btnAuth'], resolve)
    }
  ]
}
