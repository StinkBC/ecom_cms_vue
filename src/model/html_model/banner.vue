<template>
  <!-- <el-carousel :interval="interval" arrow="always">
    <el-carousel-item v-for="(item,i) in images" :key="i">
      <img :src="item.img"/>
    </el-carousel-item>
  </el-carousel> -->
<div class="html_banner" :style="'height:'+params.height+'px'">
  <mt-swipe :auto="params.auto" :speed="params.speed">
  <mt-swipe-item v-for="(img,i) in params.items" :key="i">
    <img :src="img.img" @click="goto(img.url)"/>
  </mt-swipe-item>
</mt-swipe>
</div>

</template>

<style lang="scss" scoped>

  
  .html_banner{
    background-color: #99a9bf;
    height:250px;
    width:100%;
    img{width:100%}
  }
  
  
</style>

<script>
export default {
    props:{
      params:{
        type:Object,
            default:()=>{
                return {}
            }

      },
    },
    deta(){
      return{
        images:[],
        interval:5000,
        speed:300,
      }
    },
    methods:{
      goto(url){
        console.log(url)
      }
    }
}
</script>