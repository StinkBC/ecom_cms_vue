<template>
  <el-carousel :interval="interval" arrow="always">
    <el-carousel-item v-for="(item,i) in images" :key="i">
      <img :src="item.img"/>
    </el-carousel-item>
  </el-carousel>
</template>

<style>

  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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