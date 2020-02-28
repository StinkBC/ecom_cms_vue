<template>
<el-container class="topbar">
    <el-aside>
        <span>后台管理系统</span>
    </el-aside>
<el-container>
    <el-main>
      <div style="display:inline-block; width:75%">
        <TabNav ref="tab-nav"></TabNav>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i>
            {{nickname}}
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
    </el-main>
</el-container>
</el-container>

</template>

<style  lang="scss" scoped>
</style>
<script>

import TabNav from '@/components/frame/admin_tabnav'

export default {
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
  components: { TabNav }
}
</script>
