// 无需鉴权的路由
export default [
  {
    path: '/home',
    component: () => import('@views/Index'),
    children: [
      {
        path: '/dashboard',
        name: '工作台',
        meta: { keepAlive: false, hidden: false },
        component: () => import('@views/Home.vue')
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
