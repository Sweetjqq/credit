export default {
  path: '/module1',
  label: '模块1',
  component: resolve =>
    require(['@/shared/components/page/place-holder'], resolve),
  name: 'module1',
  children: [
    {
      name: 'list',
      path: 'list',
      label: '列表',
      component: resolve => require(['../pages/module1/list'], resolve)
    },
    {
      name: 'module1_detail',
      path: ':id',
      component: resolve => require(['../pages/module1/detail'], resolve)
    }
  ]
}
