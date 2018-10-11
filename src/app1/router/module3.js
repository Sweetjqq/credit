export default {
    path: '/module3',
    label: '系统设置',
    component: resolve =>
        require(['@/shared/components/page/place-holder'], resolve),
    name: 'module3',
    children: [
        {
            name: 'createReport',
            path: 'createReport',
            label: '创建报告',
            component: resolve => require(['../pages/module3/createReport'], resolve)
        }
    ]
}
