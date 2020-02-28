
<template>
<!--以svg方式加载图标，并且制作成 <eicon></eicon>html标签  -->
<!--入参：name和color,需要用自己的iconfont直接下载后替换 public/icon整个文件夹覆盖  -->
<i class="eicon"  :style="(size)?'font-size:'+size:''">
<svg  :style="(color)?'color:'+color:''" aria-hidden="true">
          <use :xlink:href="name" />
 </svg>
</i>

</template>

<style lang="scss">

</style>

<script>
export default {
  data () {
    return {}
  },
  props: {
    'name': {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    'color': {
      type: [String, Boolean],
      required: false,
      default () {
        return false
      }
    },
    'size': {
      type: [String, Boolean],
      required: false,
      default () {
        return false
      }
    }
  },
  methods: {

  },
  components: {}
}
</script>
