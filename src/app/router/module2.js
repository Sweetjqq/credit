export default {
  path: '/module2',
  label: '系统设置',
  component: resolve =>
    require(['@/shared/components/page/place-holder'], resolve),
  name: 'module2',
  children: [
    {
      name: 'module2_page1',
      path: 'page1',
      label: '用户管理',
      component: resolve => require(['../pages/module2/page1'], resolve)
    }, {
      name: 'module2_page2',
      path: 'menuAuth',
      component: resolve => require(['../pages/module2/menuAuth'], resolve)
    }, {
      name: 'module2_page3',
      path: 'btnAuth',
      component: resolve => require(['../pages/module2/btnAuth'], resolve)
    }
  ]
}
