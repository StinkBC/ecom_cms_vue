<template>

<el-container class="topbar">
      <div style="display:inline-block; width:75%">
        <TabNav ref="tab-nav"></TabNav>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i>
            {{admin.nickname}}
            <i class="iconfont icon-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/jiabanxiong/user/profile')">
                <span style="color: #555;font-size: 14px;">个人信息</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/jiabanxiong/user/changepwd')">
                <span style="color: #555;font-size: 14px;">修改密码</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
</el-container>

</template>

<style  lang="scss" >

@import "@assets/style/mainstyle.scss";

.topbar{
  height: 60px;
  background-color: $-color-background ;
    padding: 0;
    border-bottom: 1px solid  $-color-border;
}
</style>
<script>

import TabNav from '@/components/frame/admin_tabnav'

export default {
  props:{
    admin:{
      type:Object,
      default:function(){
        return {nickname:''}
      }
    }

  },
  data () {
    return {

    }
  },
  methods: {
    logout () {

    },
    jumpTo () {

    }
  },
  components: { TabNav },
   watch: {
    $route(to, from) {
      // 路由变化处理导航Tab
      this.$refs['tab-nav'].addTab(to.name, to.fullPath);
    }
  }
}
</script>
