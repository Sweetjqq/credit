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
    path: '/module2',
    label: '系统设置',
    hidden: false,
    name: 'module2',
    id: 12,    
    children: [
      {
        id:121,
        hidden: false,
        name: 'module2_page1',
        path: 'page1',
        label: '用户管理',
      }
    ]
  }

]
