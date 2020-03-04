<!-- xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com -->
<!-- 加载成功回抛 loadSuccess 事件 -->
<template>
  <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <el-row class="excel_row">
      <el-col :span="12" >
        <form class="form-inline">
          <div class="form-group">
            <el-button class=" button" v-on:click="selectFile">选择文件</el-button>
            <div v-if="fileName&&fileName.length>0" class="fileName">已选择:{{fileName}} <i class="el-icon-close icon-remove" @click="clear"></i></div> 
            <div v-else class="fileName">未选择任何excel</div> 
            <input ref='fileName' type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change" value="上传文件" />
          </div>
        </form>
      </el-col>
    </el-row>
    <!--  <div class="row">
      <div class="col-xs-12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th v-for="c,index in cols" :key="index">{{c.name}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, key) in data" :key="index">
                <td v-for="c,index in cols" :key="index"> {{ r[c.key] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> -->
  </div>
</template>
<style scoped>
  .button{
      display: inline-block;
  }
  .fileName{
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
  .fileName:hover .icon-remove {
    visibility: visible;
  }
  .form-control{
    display: none;
  }
  .icon-remove {
    font-size: 16px;
    visibility: hidden;
    cursor: pointer;
  }

</style>
<script>
import XLSX from 'xlsx';

const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x, i) => ({ name: XLSX.utils.encode_col(i), key: i }));

const _SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

export default {
  data() {
    return {
      data: [
      "SheetJS".split(""), 
      "1234567".split(""),],
      cols: [
        { name: "列A", key: 0 },
        { name: "列B", key: 1 },
        { name: "列C", key: 2 },
        { name: "列D", key: 3 },
        { name: "列E", key: 4 },
        { name: "列F", key: 5 },
        { name: "列G", key: 6 }
      ],
      fileName:'',
      SheetJSFT: _SheetJSFT,
      cacheFile: ''
    };
  },
  props: ["excelCol"],
  mounted() {
    if (this.excelCol && this.excelCol.length > 0) {
      this.cols = this.excelCol
    }

  },
  methods: {
    clear() {
      this.$refs.fileName.value = null
      this.fileName = null
    },
    selectFile() {
      this.$refs['fileName'].click()
    
    },
    _suppress(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },
    _drop(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      const files = evt.dataTransfer.files;
      if (files && files[0]) this._file(files[0]);
    },
    _change(evt) {
      const files = evt.target.files;

      if (files && files[0]) {
        this._file(files[0])
        this.fileName=files[0].name
      };
    },
    _export(evt) {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate file and send to client */
      XLSX.writeFile(wb, "sheetjs.xlsx");
    },
    _file(file) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        /* Update state */

        this.$emit("loadSuccess", data)
        this.data = data;
        this.cols = make_cols(ws['!ref']);
      };
      reader.readAsBinaryString(file);
    }
  }
};

</script>
