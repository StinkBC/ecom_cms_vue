import Vue from 'vue'
import Router from 'vue-router'
import store from '@store/index'
import defaultRouter from '@router/default'
import rolesRouter from '@router/roleneed'

Vue.use(Router)

// 定义公共路由，其他路由需要从接口加载

// 定义需要鉴权的router

export function createRouter() {
  const router = new Router({
    mode: 'history',
    base: '/',
    routes: defaultRouter.concat(rolesRouter)
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
