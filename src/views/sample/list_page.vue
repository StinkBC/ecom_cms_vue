<template>
  <el-row >
    <!-- 搜索区域 -->
    <el-col
      :span="24"
      class="form_card"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-col :span="24" class="" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input
            size="small"
            v-model="filters.keywords"
            placeholder="关键字"
            @keyup.enter.native="handleSearch"
          ></el-input>
        </el-form-item>
        <el-radio-group v-model="filters.status" size="small">
          <el-radio-button
            v-for="s in status"
            :label="s.value"
            :key="s.value"
            >{{ s.name }}</el-radio-button
          >
        </el-radio-group>
        
          <el-form-item>
            <el-button type="primary" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">新建 </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>

    <el-col class="form_card">已选择 0 项  服务调用次数总计 0 万</el-col>

    <el-col class="form_card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="日期"  >
        </el-table-column>
        <el-table-column prop="name" label="姓名"  >
        </el-table-column>
        <el-table-column prop="province" label="省份"  >
        </el-table-column>
        <el-table-column prop="city" label="市区"  >
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编"  > </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleSearch() {
      console.log(this.filters);
    },
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      loading:false,
      filters: {
        keywords: "",
        status: -1
      },
      status: [
        {
          name: "全部",
          value: -1
        },
        {
          name: "有效",
          value: 1
        },
        {
          name: "无效",
          value: 0
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  }
};
</script>
