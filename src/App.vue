<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.1s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>
