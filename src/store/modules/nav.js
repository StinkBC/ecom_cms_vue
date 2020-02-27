const nav = {
  state: {
    // true为已经登录，false为没登录
    pagesStack: [],
    curPageTitle: ''
  },
  mutations: {
    pushpage (state, page) {
      state.pagesStack.push(page)

      return state.pagesStack
    },
    poppage (state, page) {
      // 依次出栈到pagename
      if (page) {
        state.pagesStack.pop()
      } else {
        state.pagesStack.pop()
      }
      return state.pagesStack
    },
    clearpage (state) {
      state.pagesStack = []

      return state.pagesStack
    },
    setpagetitle (state, title) {
      state.curPageTitle = (title) || ''
      return state.curPageTitle
    }
  },
  getters: {
    // 获取数据的方法
    getPagesLength: function (state) {
      return state.pagesStack.length
    },
    getLastPage: function (state) {
      if (state.pagesStack.length > 0) {
        return state.pagesStack[state.pagesStack.length - 1]
      } else {
        return { name: '' }
      }
    },
    getPageTitle: function (state) {
      if (state.curPageTitle.length > 0) {
        return state.curPageTitle
      } else {
        return ''
      }
    }
  },
  actions: {
    pagesLength () {

    }

  }
}

export default nav
