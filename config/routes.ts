export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    name: '房间列表',
    icon: 'table',
    path: '/roomers',
    component: '@/pages/roomers',
  },
  {
    name: '租客管理',
    icon: 'table',
    path: '/tenant',
    component: '@/pages/tenant',
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    hideInMenu: true,
    component: './welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
