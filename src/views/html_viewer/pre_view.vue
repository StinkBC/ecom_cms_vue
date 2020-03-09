<template>
  <section class="page">

      <mt-header :title="pageConfig.title">
  <router-link to="/" slot="left">
    <mt-button icon="back">返回</mt-button>
    <mt-button @click="handleClose">关闭</mt-button>
  </router-link>
  <mt-button icon="more" slot="right"></mt-button>
</mt-header>

    <div v-for="group in comptents">

      <mt-cell
        v-for="item in group.list"
        :to="item.path"
        is-link>
       内容区域
      </mt-cell>
    </div>
  </section>
</template>

<style  lang="scss">
  .page {
    padding-bottom: 50px;
    .indexicon {
      font-size: 22px;
      color: #26a2ff;
      display: inline-block;
      width: 30px;
      vertical-align: middle;
      &.icon-swipe {
        font-size: 26px;
      }
      &.icon-checklist {
        font-size: 18px;
      }
    }
  }

</style>
<script type="text/babel">

  export default {
    data() {
      return {
        comptents: [
            {title:"营销页面",
            list:[]
            }
        ],
        pageConfig:{
            title:"页面"
        }
      };
    },
    created() {
      
    }
  };
</script>