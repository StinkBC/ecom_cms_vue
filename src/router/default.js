// 无需鉴权的路由
export default [
  {
    path: '/home',
    component: () => import('@views/Index'),
    children: [
      {
        path: '/dashboard',
        name: '工作台',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/Home.vue')
      }
    ]
  },
  {
    path: '/sample',
    component: () => import('@views/Index'),
    name: '页面样本',
    children: [
      {
        path: '/sample/all',
        name: '所有组件',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/sample/all_compontents.vue')
      },
      {
        path: '/sample/list',
        name: '简单列表页',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/sample/list_page.vue')
      },
      {
        path: '/sample/supperlist',
        name: '复杂列表页',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/sample/list_page_supper.vue')
      },
      {
        path: '/sample/detail',
        name: '简单详情页',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/sample/detail_page.vue')
      },
      {
        path: '/sample/supperdetail',
        name: '复杂详情页',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/sample/detail_page_supper.vue')
      },
      {
        path: '/sample/step',
        name: '分布配置页',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/sample/step_page.vue')
      },
      {
        path: '/sample/excel',
        name: 'excel处理页',
        hidden: false,
        meta: { keepAlive: false },
        component: () => import('@views/sample/excel_sample.vue')
      }
    ]
  },
  {
    path: '/adminLogin',
    name: '登录',
    hidden: true,
    meta: { keepAlive: false },
    component: () => import('@views/Login.vue')
  },
  { path: '/403', component: () => import('@views/errors/403'), hidden: true },
  { path: '/404', component: () => import('@views/errors/404'), hidden: true },
  { path: '/error', component: () => import('@views/errors/error'), hidden: true }

]
