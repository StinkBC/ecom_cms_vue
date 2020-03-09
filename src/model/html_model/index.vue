<template>
  <!-- 原文链接：https://blog.csdn.net/m0_37118353/article/details/100050321*/ -->
  <div>
    <component :is="rendertpl" :params="params" v-if="rendertpl"></component>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    cpname: {
      type: String,
      default() {
        return "";
      }
    },
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      rendertpl: null
    };
  },

  watch: {
    cpname: function() {
      this.init();
    }
  },

  computed: {
    loadertpl() {
      return () => import("@/model/html_model/" + this.cpname + ".vue");
    }
  },

  methods: {
    init: function() {
      const _this = this;
      _this
        .loadertpl()
        .then(() => {
          // 动态加载模板
          _this.rendertpl = () => _this.loadertpl();
         
        })
        .catch(() => {
          // 模板不存在404时处理
          _this.rendertpl = () => import("@views/errors/404");
        });
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped></style>
