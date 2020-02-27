
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import { createRouter } from '@router/router'
import mystore from '@store/index.js'
import ElementUI from 'element-ui'
import 'amfe-flexible'
import FastClick from 'fastclick'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.5,
  error: require('@assets/images/error_img.png'),
  loading: require('@assets/images/loading_img.png'),
  attempt: 1
})

FastClick.attach(document.body) //  hack the active pseudo-classes failure caused by -webkit-overflow-scrolling touch

export function createApp () {
  const router = createRouter()
  // Vue.use(router)
  // const store = createStore()
  const app = new Vue({
    router,
    store: mystore,
    render: h => h(App)
  })

  return { app, router }
}
