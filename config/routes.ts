export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin'],
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              
              {
                path: '/home',
                name: '首页',
                icon: 'home',
                component: './Home',
              },
              {
                path: '/staffs',
                name: '用户管理',
                icon: 'user',
                authority: ['admin'],
                routes: [
                  {
                    path: '/staffs/list',
                    name: '会员列表',
                    component: './staffs/StaffsList',
                  },
                  {
                    path: '/staffs/add',
                    name: '添加会员',
                    hideInMenu: true, 
                    component: './staffs/StaffsEdit',
                  },
                  {
                    path: '/staffs/edit/:id',
                    name: '编辑会员',
                    hideInMenu: true,
                    component: './staffs/StaffsEdit',
                  }
                ]
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                // authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    // authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
