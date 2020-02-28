const Administrator = {
  state: {
    // true为已经登录，false为没登录
    isLogin: true,
    roles: [],
    name: ''
  },
  mutations: {
    updateAdministrator (state, page) {
      state.pagesStack.push(page)

      return state.pagesStack
    },
    changeStatus (state, page) {
      // 依次出栈到pagename
      if (page) {
        state.pagesStack.pop()
      } else {
        state.pagesStack.pop()
      }
      return state.pagesStack
    }
  },
  getters: {
    // 获取数据的方法
    isLogin: function (state) {
      return state.isLogin
    },
    getInfo: function (state) {
      if (state.isLogin) {
        return { name: state.name }
      } else {
        return false
      }
    }
  },
  actions: {
    signOut () {

    },
    signIn () {

    }

  }
}

export default Administrator
