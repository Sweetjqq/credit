export const btnmaplist = {
  '1': {
    'name': '用户管理',
    'require': true
  },
  '11': {
    'name': '分配权限按钮',
    'require': true
  }
}

export const b = [
  {
    checked: true,
    value: 'a'
  }, {
    checked: false,
    value: 'b'
  }
]

export const ButtonKey = [
  {
    "label": "用户管理",
    "id": 1,
    "hidden": false,
    "children": [
      {
        'hidden': true,
        "label": "分配权限按钮",
        "description": "btn_auth",
        "id": 11
      }
    ]
  }
]

export const MenuKey = [
  {
    path: '/module',
    label: '系统设置',
    hidden: false,
    name: 'module',
    id: 11,    
    children: [
      {
        id:111,
        hidden: false,
        name: 'account',
        path: 'account',
        label: '用户管理',
      }
    ]
  },
    {
      path: '/module1',
      label: '功能页面',
      hidden: false,
      name: 'module1',
      id: 21,
      children: [{
        id: 211,
        hidden: false,
        name: 'list',
        path: 'list',
        label: '首页',
      }]
    }
]
