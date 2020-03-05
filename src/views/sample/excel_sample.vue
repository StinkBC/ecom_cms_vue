/* eslint-disable */
<template>
  <el-col :span="24">
    <el-row>
      <el-col :span="24" class="form_card">
        <excel
          id="excel"
          ref="excel"
          :excelCol="excelCol"
          @loadSuccess="questionsExcelLoadSuccess"
        ></excel>
      </el-col>
      <el-col :span="24" class="form_card">
        <div v-if="importExcel">
          <div class="info">导入数据总数{{ allArr.length }}个</div>

          <el-table
            :data="currentArr"
            style="width: 100%"
            id="questionsTable"
            max-height="600"
            @change="handleTableChange"
          >
            <el-table-column
              v-for="(t, i) in titleCols"
              :fixed="i===0"
              :key="i"
              :prop="i.toString()"
              :label="t"
            >
            </el-table-column>
          </el-table>   
          <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="pagination.current"
      :page-sizes="[10, 50,100, 200]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>

        </div>
      </el-col>
    </el-row>
  </el-col>
</template>
<style lang="scss" scoped></style>

<script>
import excel from "@common/excel.vue";

export default {
  data() {
    return {
      importExcel: false,
      allArr: [],
      excelCol:[],
      currentArr:[],
      titleCols: [],
      pagination: {
        total: "",
        current: 1,
        pageSize: 50
      }
    };
  },
  components: {
    excel: excel
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
    },
    questionsExcelLoadSuccess(excel) {
      // excel加载成功
      // 进行数据格式化
      let _this = this;
      _this.importExcel = true;
      excel.forEach((v, index) => {
        if (index === 0) {
          // 表头
          _this.titleCols=[].concat(v);
        }
        if (index > 0) {
          let temp={}
          v.forEach((c, i) => {
            temp[i.toString()]=c
          })
          _this.allArr.push(temp);
        }
      });

      _this.pagination.total = _this.allArr.length;
      _this.handlePaginationChange()
    },
      handleSizeChange(s){
        this.pagination.pageSize=s
        this.handlePaginationChange()
      },
    handlePageChange(p){
      this.pagination.current=p
      this.handlePaginationChange()
    },
    handlePaginationChange(){
      let lower=(this.pagination.current-1)*this.pagination.pageSize;
      let upper=(lower+this.pagination.pageSize>this.pagination.total)?this.pagination.total-1:lower+this.pagination.pageSize;

      this.currentArr=this.allArr.slice(lower,upper)
      


    }
  }
};
</script>
