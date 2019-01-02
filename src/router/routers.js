import Main from '@/components/main'

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
            import('@/view/login/login.vue')
},
{
  path: '/projectListmenu',
  name: 'projectListmenu',
  // redirect: '/projectList',
  meta: {
    hideInBread: true
  },
  // eslint-disable-next-line no-dupe-keys
  component: Main,
  children: [{
    path: '/projectList',
    name: 'projectList',
    meta: {
      icon: 'ios-navigate',
      title: '项目列表'
    },
    component: () =>
                import('@/view/projectMaintenanceList.vue')
  }]
},
{
  path: '/personListmenu',
  name: 'personListmenu',
  meta: {
    hideInBread: true
  },
  // eslint-disable-next-line no-dupe-keys
  component: Main,
  children: [{
    path: '/personList',
    name: 'personList',
    meta: {
      icon: 'md-menu',
      title: '日数据列表'
    },
    component: () =>
                import('@/view/personal/persontenanceList.vue')
  }]
},
{
  path: '/personmainListmenu',
  name: 'personmainListmenu',
  meta: {
    hideInBread: true
  },
  // eslint-disable-next-line no-dupe-keys
  component: Main,
  children: [{
    path: '/personmainList',
    name: 'personmainList',
    meta: {
      icon: 'ios-document',
      title: '个人日报列表'
    },
    component: () =>
                import('@/view/personal/personMaintenanceList.vue')
  }]
},
{
  path: '/projectAddmenu',
  name: 'projectAddmenu',
  meta: {
    hideInMenu: true,
    hideInBread: true
  },
  component: Main,
  children: [{
    path: '/projectAdd',
    name: 'projectAdd',
    meta: {
      icon: 'ios-navigate',
      title: '项目添加'
    },
    component: () =>
                import('@/view/projectMainTenanceAdd.vue')
  }]
},
{
  path: '/personAddmenu',
  name: 'personAddmenu',
  meta: {
    hideInMenu: true,
    hideInBread: false
  },
  component: Main,
  children: [{
    path: '/personAdd',
    name: 'personAdd',
    meta: {
      icon: 'ios-navigate',
      title: '项目添加'
    },
    component: () =>
                import('@/view/personal/personMainTenanceAdd.vue')
  }]
},
{
  path: '/projectViewmenu',
  name: 'projectViewmenu',
  meta: {
    hideInMenu: true,
    hideInBread: false
  },
  component: Main,
  children: [{
    path: '/projectView',
    name: 'projectView',
    meta: {
      icon: 'ios-navigate',
      title: '项目详细'
    },
    component: () =>
                import('@/view/projectMainTenanceView.vue')
  }]
},
{
  path: '/personViewmenu',
  name: 'personViewmenu',
  meta: {
    hideInMenu: true,
    hideInBread: false
  },
  component: Main,
  children: [{
    path: '/personView',
    name: 'personView',
    meta: {
      icon: 'ios-navigate',
      title: '项目详细'
    },
    component: () =>
                import('@/view/personal/personMainTenanceView.vue')
  }]
},
{
  path: '/argu',
  name: 'argu',
  meta: {
    hideInMenu: true
  },
  component: Main,
  children: [{
    path: 'params/:id',
    name: 'params',
    meta: {
      icon: 'md-flower',
      title: route => `{{ params }}-${route.params.id}`,
      notCache: true,
      beforeCloseName: 'before_close_normal'
    },
    component: () =>
                    import('@/view/argu-page/params.vue')
  },
  {
    path: 'query',
    name: 'query',
    meta: {
      icon: 'md-flower',
      title: route => `{{ query }}-${route.query.id}`,
      notCache: true
    },
    component: () =>
                    import('@/view/argu-page/query.vue')
  }
  ]
},
{
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () =>
            import('@/view/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () =>
            import('@/view/error-page/500.vue')
},
{
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () =>
            import('@/view/error-page/404.vue')
}
]
