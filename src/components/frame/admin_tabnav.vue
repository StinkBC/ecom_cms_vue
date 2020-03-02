<template>
  <div class="nav_a">
    <el-tabs v-model="tabsValue" class="TabNav" type="card" @tab-click="activeTab" @tab-remove="removeTab" closable>
      <el-tab-pane v-for="item in tableTabs" :key="item.path" :label="item.name" :name="item.path">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss">
@import "@assets/style/mainstyle.scss";
.nav_a {
  width: 95%;
  margin-top: 25px;
  line-height: 20px;

  .el-tabs--card>.el-tabs__header {
    border: none;

    .is-active {
      color: $-color-primary !important;
      background: $-color-background !important;
      border-bottom: none !important;
      top: -4px !important;
    }

    .el-tabs__nav {
      height: 35px;
      padding: 0 5px;
      border: none;

      .el-tabs__item {
        height: 40px;
        line-height: 32px;
        background: $-color-background !important;
        padding: 0 10px;
        color: $-menu-color-inline-opened;
        border: $-color-border 1px solid;
        border-radius: 5px;
        margin-top: 4px;
        margin-right: 10px;
      }
    }
  }
}

</style>

<script>
export default {
  name: 'TabNav',
  // props: 'TabRouter',
  data () {
    return {
      tabsValue: '1',
      tableTabs: [],
      tabIndex: 0,
      newTitle: '1',
      newContent: ''
    }
  },
  methods: {
    addTab (name, path) {
      if (path === '/') {
        return this.$router.push('/')
      }

      // 判断是否存在，需要特殊处理 editor页面，替换参数
      let tabIndex = -1
      let matchPath = path

      if (path.match(/editor/i)) {
        if (/\/[game|aiscenes]/.test(path)) {
          let lastIndex = path.lastIndexOf('/')
          matchPath = path.substr(0, lastIndex)
          tabIndex = this.tableTabs.findIndex(function (item) {
            return item.path.substr(0, item.path.lastIndexOf('/')).toLowerCase() == matchPath.toLowerCase()
          })
        } else {
          matchPath = path.split('?')[0]
          tabIndex = this.tableTabs.findIndex(item => {
            return item.path.indexOf(matchPath) > -1
          })
        }
      } else {
        tabIndex = this.tableTabs.findIndex(function (item) {
          return item.path.toLowerCase() == path.toLowerCase()
        })
      }

      if (tabIndex < 0) {
        // 如果不存在创建
        this.tableTabs.push({
          name: name,
          path: path
        })
        // 如果数目过多，删除第一个
        if (this.tableTabs.length >= 12) {
          this.tableTabs.splice(0, 1)
        }
        this.tabsValue = path
      } else {
        // 如果存在直接激活

        // 处理编辑页替换
        this.tableTabs[tabIndex].path = path
        this.tabsValue = path
      }

      localStorage.setItem('tableTabs', JSON.stringify(this.tableTabs))
    },
    removeTab (tabPath) {
      let tabs = this.tableTabs
      let activePath = this.tabsValue
      if (activePath == tabPath && activePath.length > 0) {
        tabs.forEach((tab, index) => {
          if (tab.path === tabPath) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activePath = nextTab.path
              this.tableTabs = tabs.filter(tab => tab.path !== tabPath)
              this.$router.push({ path: nextTab.path })
            }
          }
        })
      } else if (activePath.length > 0) {
        this.tabsValue = activePath
        this.tableTabs = tabs.filter(tab => tab.path !== tabPath)
        console.log(tabPath)
      } else {
        return false
      }

      localStorage.setItem('tableTabs', JSON.stringify(this.tableTabs))
    },
    activeTab (a) {
      this.$router.push({ path: a.paneName })
    }
    // 方法定义结束

  },
  mounted () {
    // 获取用户历史
    if (localStorage.getItem('tableTabs')) {
      this.tableTabs = JSON.parse(localStorage.getItem('tableTabs'))
    }
    this.addTab(this.$route.name, this.$route.fullPath)
  }

}

</script>
