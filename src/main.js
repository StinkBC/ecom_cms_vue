
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import { createRouter } from '@router/router'
import mystore from '@store/index.js'
import ElementUI from 'element-ui'
import '@assets/style/element-variables.scss'
import '@assets/style/mainstyle.scss'

import 'amfe-flexible'
import FastClick from 'fastclick'

import { setRemInit } from '@/rem'
// icon插件
import Eicon from '@common/icon.vue'

setRemInit()// 进行初始化立即运行

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('Eicon', Eicon)

Vue.use(VueLazyload, {
  preLoad: 1.5,
  error: require('@assets/images/error_img.png'),
  loading: require('@assets/images/loading_img.png'),
  attempt: 1
})

FastClick.attach(document.body) //  hack the active pseudo-classes failure caused by -webkit-overflow-scrolling touch

export function createApp() {
  const router = createRouter()
  // Vue.use(router)
  // const store = createStore()
  const app = new Vue({
    router,
    store: mystore,
    render: h => h(App)
  })
  // 把router注入window，以便在api中处理
  window.router = router

  return { app, router }
}
