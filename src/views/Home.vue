/* eslint-disable */
<template>
<el-container>


<el-row>
 <el-col :span="24">
   图标示意
<Eicon name="#icon-earth"></Eicon>

<el-row>
   <el-col :span="24">

  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</el-col>
</el-row>

<el-row>
   <el-col :span="24">
  <el-button plain>朴素按钮</el-button>
  <el-button type="primary" plain>主要按钮</el-button>
  <el-button type="success" plain>成功按钮</el-button>
  <el-button type="info" plain>信息按钮</el-button>
  <el-button type="warning" plain>警告按钮</el-button>
  <el-button type="danger" plain>危险按钮</el-button>
</el-col>
</el-row>

<el-row>
   <el-col :span="24">
  <el-button round>圆角按钮</el-button>
  <el-button type="primary" round>主要按钮</el-button>
  <el-button type="success" round>成功按钮</el-button>
  <el-button type="info" round>信息按钮</el-button>
  <el-button type="warning" round>警告按钮</el-button>
  <el-button type="danger" round>危险按钮</el-button>
</el-col>
</el-row>

<el-row>
   <el-col :span="24">
  <el-button icon="el-icon-search" circle></el-button>
  <el-button type="primary" icon="el-icon-edit" circle></el-button>
  <el-button type="success" icon="el-icon-check" circle></el-button>
  <el-button type="info" icon="el-icon-message" circle></el-button>
  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
  <el-button type="danger" icon="el-icon-delete" circle></el-button>
</el-col>
</el-row>

</el-col>
</el-row>
<el-row>
   <el-col :span="24">
  <el-input-number v-model="testvalue"  :min="1" :max="10" label="描述文字"></el-input-number>
  <el-input-number  v-model="testvalue" disabled :min="1" :max="10" label="描述文字"></el-input-number>

</el-col>
</el-row>

<el-row>
   <el-col :span="24">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>

</el-col>
</el-row>
<el-row>
<el-tag>标签一</el-tag>
<el-tag type="success">标签二</el-tag>
<el-tag type="info">标签三</el-tag>
<el-tag type="warning">标签四</el-tag>
<el-tag type="danger">标签五</el-tag>

</el-col>
</el-row>

</el-container>
</template>

<style  lang="scss" scoped>
</style>

<script>

export default {
  data () {
    return {
      isCollapse: false,
      testvalue: 99
    }
  },
  methods: {},
  components: { }
}
</script>
