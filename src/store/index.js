import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    nav
    // app,
    // user,
    // menu
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

export default store
