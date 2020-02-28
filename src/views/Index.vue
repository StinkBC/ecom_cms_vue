/* eslint-disable */
<template>
  <el-container class="admin">
    <el-header>
      <adminTop></adminTop>
    </el-header>
    <el-container>
      <el-aside>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          class="admin_menu"
          default-active="1-4-1"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <transition
            v-if="$route.meta.keepAlive"
            name="el-fade-in-linear"
            mode="out-in"
          >
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
          <transition v-else name="el-fade-in-linear" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>

// 重写目录颜色，但是和主题进行隔离。

$-menu-color-background: #1e1e1e ;
$-menu-color-text: #fefefe ;
$-menu-color-inline: mix($-menu-color-background, $-menu-color-text,10%);

.admin {
  background-color: #f8fafc;

  &_menu {
    background-color: $-menu-color-background;
    color: $-menu-color-text ;

    .el-menu {
      .el-submenu {
        color: $-menu-color-text !important;
      }
      .el-menu--inline {
        color: $-menu-color-text !important;
        background-color: $-menu-color-inline;
      }
      .is-active {
        color: $-menu-color-text !important;
      }
      .is-opened {
        color: $-menu-color-text !important;
      }
    }
  }
}
</style>
<script>
import adminTop from '@/components/frame/admin_top'

export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {},
  components: { adminTop }
}
</script>
