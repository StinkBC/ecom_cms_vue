import Vue from 'vue'
import Router from 'vue-router'
import store from '@store/index'

Vue.use(Router)

// 定义公共路由，其他路由需要从接口加载
const commonRouter = [
  {
    path: '/',
    component: () => import('@views/Index'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { keepAlive: false, needNavTag: false },
        component: () => import('@views/Home.vue')
      }
    ]
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    meta: { keepAlive: false, needNavTag: false },
    component: () => import('@views/Login.vue')
  },
  { path: '/403', component: () => import('@views/errors/403'), hidden: true },
  { path: '/404', component: () => import('@views/errors/404'), hidden: true },
  { path: '/error', component: () => import('@views/errors/error'), hidden: true }

]

export function createRouter () {
  let router = new Router({
    mode: 'history',
    base: '/',
    routes: commonRouter
  })

  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta && to.meta.title ? to.meta.title : '管理后台'
    }

    router.mode = 'history'
    // 管理页面栈，正式版本需要配合 localStorage。先简单控制排重，其他再说了
    // 登录控制也可以在这里处理

    // 检测目录缓存以及请求目录
    // 目录数据库配置格式为 目录id | 目录title | 上级目录id | 目录path | 目录前端文件地址 | 是否展示在目录 | 是否keepAlive

    if (to.path === '/adminLogin') {
      // 以后可以做登录直接到首页工作台，现在先不拦截
      next()
    } else if (store.getters.isLogin) {
      if (to.path === '/') {
        next('/dashboard')
      } else {
        next()
      }
    } else {
      next('/adminLogin')
    }
  })

  router.afterEach(() => {

  })

  return router
}
