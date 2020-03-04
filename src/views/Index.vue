/* eslint-disable */
<template>
  <el-container class="admin">
  
    <el-aside :style="'width:'+asideWidth">

    <el-container class="admin_menu">
       <el-header style="padding:0">
         <el-row type="flex" class="top_logo"  align="center">
           <el-col  class="top_logo_content"  :span=24>
            <span v-if="!isCollapsed">后台管理系统</span>
          
            <span v-else >LOGO</span>
           </el-col>
         </el-row>
       </el-header>
   
        <el-menu
          :default-active="$route.path"
          width
          :router="true"
          :collapse="isCollapsed"
          :default-openeds="openedMenus"
         
        >
          <div @click="isCollapsed = !isCollapsed">
            <i v-if="!isCollapsed" class="el-icon-s-fold"></i>
            <i v-if="isCollapsed" class="el-icon-s-unfold"></i>
          </div>
          <component
            v-for="(s1, si1) in menuStructures"
            :is="s1.component"
            :class="
              s1.component === 'el-submenu'
                ? 'admin_menu_sub'
                : 'admin_menu_inline'
            "
            :key="si1"
            :index="s1.index"
          >
            <template
              v-if="s1.component === 'el-submenu'"
              class="admin_menu_sub"
              slot="title"
            >
              <i class="el-icon-location"></i>
              <span slot="title">{{ s1.title }}</span>
            </template>
            <span v-else>{{ s1.title }}</span>

            <component
              v-for="(s2, si2) in s1.children"
              :is="s2.component"
              :class="
                s2.component === 'el-submenu'
                  ? 'admin_menu_sub'
                  : 'admin_menu_inline'
              "
              :key="si2"
              :index="s2.index"
            >
              <template
                v-if="s2.component === 'el-submenu'"
                class="admin_menu_sub"
                slot="title"
              >
                <i class="el-icon-location"></i>
                <span slot="title">{{ s2.title }}</span>
              </template>
              <span v-else>{{ s2.title }}</span>

              <component
                v-for="(s3, si3) in s2.children"
                :is="s3.component"
                :class="
                  s3.component === 'el-submenu'
                    ? 'admin_menu_sub'
                    : 'admin_menu_inline'
                "
                :key="si3"
                :index="s3.index"
              >
                <span>{{ s3.title }}</span>
              </component>
            </component>
          </component>
        </el-menu>

    </el-container>
      </el-aside>
      <el-container>
                  <el-header style="padding:0">
      <adminTop :admin="adminInfo"></adminTop>
    </el-header>

    <!-- 页面主体 -->
        <el-main>
          <el-row justify="space-between">
            <el-col :span="24" >
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
            </el-col>
          </el-row>
        </el-main>

        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<style lang="scss">

@import "@assets/style/mainstyle.scss";

.admin {
  background-color: $-color-background;
     min-height: calc(100vh);
    .top_logo{
      height: 100%;
      border-bottom:  $-menu-color-inline-hover 1px solid;
      &_content{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

  .el-menu{

    height: 100%;
   border:none;

  }
  .el-menu,.el-menu--popup,.el-menu--popup-right-start{
  background-color: $-menu-color-background;
    color: $-menu-color-text;
  }
  .el-submenu,.el-submenu__title{
    text-align: left;
  }
     

  &_menu {
    background-color: $-menu-color-background;
    color: $-menu-color-text;
    height: 100%;

    &_inline {
      color: $-menu-color-text !important;
      background-color: $-menu-color-background;
    }

    &_inline:hover,&_inline:focus {
      color: $-menu-color-text !important;
      background-color: $-menu-color-inline-hover;
    }
    

    &_sub {
      color: $-menu-color-text !important;

      .el-submenu__title {
        color: $-menu-color-text !important;
      }
      .el-submenu__title:hover,.el-submenu__title:focus {
        color: $-menu-color-text !important;
        background-color: $-menu-color-inline-hover;
      }

      &_inline {
      color: $-menu-color-text !important;
      background-color: $-menu-color-inline;
    }
    &_inline:hover,&_inline:focus {
      color: $-menu-color-text !important;
      background-color: $-menu-color-inline-hover;
    }
    }

    
    .el-menu-item:hover,.el-menu-item:focus, {
      color: $-menu-color-text !important;
      background-color: $-menu-color-inline-hover;
    }
    .is-active,.is-active:focus  {
      color: $-menu-color-text !important;
      background-color: $-color-primary;
    }
    .is-opened,.is-opened:focus {
      background-color: $-menu-color-inline-opened;
    }
  }
}
</style>
<script>
import adminTop from "@/components/frame/admin_top";
import API from "@api/api_admin";

export default {
  data() {
    return {
      isCollapsed: false,
      openedMenus:[],
      adminInfo:{},
      menuStructures: [
        { component: "el-menu-item", title: "1", index: "1", children: [] },
        {
          component: "el-submenu",
          title: "2",
          index: "2",
          children: [
            {
              component: "el-menu-item",
              title: "2-1",
              index: "2-1",
              children: []
            },
            {
              component: "el-menu-item",
              title: "2-2",
              index: "2-2",
              children: []
            }
          ]
        },
        {
          component: "el-submenu",
          title: "3",
          index: "3",
          children: [
            {
              component: "el-submenu",
              title: "3-1",
              index: "3-1",
              children: [
                {
                  component: "el-menu-item",
                  title: "3-1-1",
                  index: "3-1-1",
                  children: []
                },
                {
                  component: "el-menu-item",
                  title: "3-1-2",
                  index: "3-1-2",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed:{

    asideWidth:function(){

      if(this&&this.isCollapsed){
         return '60px'
      }else{
        return '200px'
      }
    }

  },
  methods: {
    getAdminInfo(){
      let _this=this

      API.getInfo()
            .then(
              function(result) {
                 console.log(result)
                if(result.code===1){
                 
                }
              },
              function(err) {
                _this.loading = false;
                _this.$message.error({
                  showClose: true,
                  message: err.toString(),
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              _this.loading = false;
              console.log(error);
              _this.$message.error({
                showClose: true,
                message: '请求出现异常',
                duration: 2000
              });
            });

    },
    reflashMenus() {
      // 对目录树结构，需要做几个处理：
      // 去除隐藏的页面
      // 如果是多层结构，但是只有一个子页面，那么要提升页面等级
      // 所以，需要以末端页面反向进行组装

      let _this = this;
      _this.menuStructures = [];

      function addMenu(menuArr, router,line ) {
        let menuItem = {
          component: "el-menu-item",
          title: router.name,
          index: router.path
        };

        line.push(menuItem.index)
        menuItem.line=[].concat(line)
        // 设置默认展开

if(menuItem.index===_this.$route.path){
        _this.openedMenus=menuItem.line
        }

       
        if (router.children && router.children.length > 0) {
          // 如果有子节点，遍历
          menuItem.children = [];
          router.children.forEach(r => {
            if (!r.hidden) {
              addMenu(menuItem.children, r,[].concat(line));
            }
          });
          // 子节点遍历结束后
          if (
            menuItem.children.length === 1 &&
            menuItem.children[0].children &&
            menuItem.children[0].children.length === 0
          ) {
            menuItem.title = menuItem.children[0].title;
            menuItem.index = menuItem.children[0].index;
            menuItem.children = [];
          } else if (menuItem.children.length !== 0) {
            menuItem.component = "el-submenu";
          }
        } else {
          menuItem.children = [];
        }

        

        if (menuItem.index === "/") {
          menuItem.index += menuItem.title;
        }

        menuArr.push(menuItem);

        return menuArr;
      }

      _this.$router.options.routes.forEach(r => {
        if (!r.hidden) {
          addMenu(_this.menuStructures, r,[]);
        }
      });

      console.log(_this.openedMenus)
    }
  },
  components: { adminTop },
  mounted() {
    this.reflashMenus();

    this.getAdminInfo();
  }
};
</script>
