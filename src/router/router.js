import Vue from 'vue'
import Router from 'vue-router'
import store from '@store/index'

Vue.use(Router)

export function createRouter () {
  let router = new Router({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        name: 'home',
        meta: { stackName: 'home', keepAlive: true, toptype: 'home', tabtype: 'home', tablabel: 'home' },
        component: () => import('@views/Home.vue')
      }

    ]
  })

  router.beforeEach((to, from, next) => {
    router.mode = 'history'
    // 管理页面栈，正式版本需要配合 localStorage。先简单控制排重，其他再说了
    // 登录控制也可以在这里处理
    if (store.getters.getPagesLength === 0) {
      // if (process.browser) {
      //   window.localStorage.getItem('pagesStack',[])
      // }
      store.commit('pushpage', { name: 'home' })
    }

    if (store.getters.getLastPage.name !== to.name) {
      if (to.meta.stackName === from.meta.stackName) {
        store.commit('poppage')
        store.commit('pushpage', to)
      } else {
        store.commit('pushpage', to)
      }
    }

    next()
  })

  return router
}
