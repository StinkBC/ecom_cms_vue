<template>
  <!-- <el-carousel :interval="interval" arrow="always">
    <el-carousel-item v-for="(item,i) in images" :key="i">
      <img :src="item.img"/>
    </el-carousel-item>
  </el-carousel> -->
<div class="html_banner">
  <mt-swipe :auto="4000">
  <mt-swipe-item>1</mt-swipe-item>
  <mt-swipe-item>2</mt-swipe-item>
  <mt-swipe-item>3</mt-swipe-item>
</mt-swipe>
</div>

</template>

<style>

  
  .html_banner{
    background-color: #99a9bf;
    height:250px;
    width:100%;
  }
  
  
</style>

<script>
export default {
    props:{
        images:{
            type:Array,
            default:()=>{
                return [{img:"/img/grep.png",target:""},{img:"/img/grep.png",target:""}]
            }
        },
        interval:{
            type:Number,
            default:()=>{
                return 5000
            }
        }
    }
}
</script>