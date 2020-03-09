<template>
  <el-card class="html-card ql-editor">
  <div v-html="params.html">
  
  </div>
</el-card>
</template>

<style lang="scss">

@import '~quill/dist/quill.snow.css';


  .html-card {
    width:100%
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
      }
    },
    methods:{
      goto(url){
        console.log(url)
      }
    }
}
</script>