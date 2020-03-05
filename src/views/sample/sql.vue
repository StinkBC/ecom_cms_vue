<template>
  <el-row  justify="start"  :gutter="5">
    <el-col :span="24" class="warp-main editor_box" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="margin-bottom:0.6rem;padding-bottom: 1rem">
     
        <el-form :inline="true" :model="filters">
          <el-form-item style="width:100%;" label="数据库">
            <el-select style="width:200px;margin-left:10px" v-model="filters.db" placeholder="请选择">
              <el-option v-for="item in genderoptions" :key="item" :label="item" :value="item">
                <i class="b-icon-jifen"></i>
                <span>{{ item }}</span>
              </el-option>
            </el-select>
            <el-button type="primary" @click="sqlQuery">查询</el-button>
            <el-button type="primary" plain @click="sqlExcel">导出</el-button>
            <el-button type="info" plain @click="resetSql">重置</el-button>
          </el-form-item>
          <el-col :span="19">
            <editor v-model="filters.text" @init="editorInit" lang="sql" theme="chrome" width="100%" height="240"></editor>
            <!-- <el-input style="display:block;width:98%" type="textarea" :rows="10"
                      placeholder="sql语句 【注：SQL请加上limit，否则系统自动设置上限为 50000】" v-model="filters.text"></el-input> -->
          </el-col>
          <el-col :span="5">
            <el-table :data="filters.tables" height="240" border highlight-current-row style="width: 100%;">
              <el-table-column label="表" prop="item">
                <template slot-scope="scope">
                  <div v-on:dblclick="tableClick" style="cursor: pointer;">
                    <i class="b-icon-rili" style="margin-right:2px"></i><span>{{scope.row.item}}</span></div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form>
      </el-col>
      <el-col>
        <!--数据区域-->
        <div>
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="Query History" name="History">
              <p v-if="sql_history.length==0">无历史记录</p>
              <el-table v-else style="cursor: pointer;" @row-click="sql_history_click" stripe max-height="500" :data="sql_history">
                <el-table-column v-for="key,index in sql_history_keys" :label="key" :key="key" :prop="key">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane v-for="data,index in datas" :key="index" :name="'数据'+(index+1)" :label="'数据'+(index+1)+'：'+data.length+'行'">
              <el-table :data="data" height="500" max-height="500" border highlight-current-row style="width: 100%;" v-loading="hasData" element-loading-text="无数据">
                <el-table-column v-for="item,i in data_keys[index]" :key="i" min-width="210" :fixed="item=='id'" sortable resizable :label="item" :prop="item">
                  <template slot-scope="scope">
                    <el-popover v-if="typeof(scope.row[item])=='string' && scope.row[item].length>40" placement="top-start" :title="item" width="400" trigger="click" :content="scope.row[item]">
                      <el-button slot="reference">{{scope.row[item].slice(0,40)}}</el-button>
                    </el-popover>
                    <div v-else> {{scope.row[item]}}</div>
                  </template>
                </el-table-column>
                <el-table-column min-width="150" fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button class="copyBtn" size="mini" type="success" :data-clipboard-text="clipboardText(scope)" plain>复制本行(JSON)
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import API from "@api/api_db";
import Clipboard from 'clipboard';
import {formatDate} from "@/model/tools/format_date"


let clipboard = new Clipboard('.copyBtn');

clipboard.on('success', function(e) {
  e.trigger.children[0].textContent = "已复制"
});

clipboard.on('error', function(e) {
  e.trigger.children[0].textContent = "出错"
});

export default {
  components: {
    editor: require('vue2-ace-editor'),
  },
  data() {
    return {
      filters: {
        db: '',
        text: '',
        tables: []
      },
      activeName: "History",
      sql_history: [],
      sql_history_keys: ["db", "sql", "time"],
      hasData: true,
      genderoptions: [],
      datas: [],
      data_keys: [],
      loading: false,
    }
  },
  methods: {
    editorInit: function() {
      // 高亮配置
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/sql') //language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/sql') //snippet
    },
    tableClick(event) {
      this.filters.text = this.filters.text + " " + event.currentTarget.innerText

    },
    sql_history_click(row, event, column) {
      this.filters.db = row.db
      this.filters.text = row.sql
    },
    sqlExcel() {
      let that = this;

      let sql = that.filters.text.replace(/[\r\n]/g, " ")

      let params = { 'dbName': that.filters.db, 'sql': sql };
      API.exportExcel(params).then(function(result) {
        let blob = new Blob([result], {
          'type': 'application/msexcel'
        });
        if (process.browser) {
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.download = `export.xls`;
          document.body.appendChild(link);
          link.click()
        }

      });
    },
    clipboardText(scope) {
      return JSON.stringify(scope.row)
    },

    resetSql() {
      let genderoptions = that.genderoptions
      Object.assign(this.$data, this.$options.data())

      that.genderoptions = genderoptions
    },
    selectChange(value) {
      // this.filters.db = value;
      this.queryTables();
    },
    queryTables() {
      let that = this;
      let params = { 'dbName': that.filters.db, 'sql': 'show tables' };
      API.search(params).then(function(result) {
        if (result && result.code >= 0) {
          that.filters.tables = [];
          var jsonDatas = result.data['show tables'];
          var key;
          for (var i in jsonDatas[0]) {
            key = i;
          }
          for (var i in jsonDatas) {
            var map = [];
            map['item'] = jsonDatas[i][key];
            that.filters.tables.push(map)
          }
        } else {
          that.$message.error({ showClose: true, message: result.popups.content, duration: 1000 });
        }
      }, function(err) {
        that.$message.error({ showClose: true, message: err.toString(), duration: 1000 });
      });
    },
    sqlQuery() {
      let that = this;
      let sql = that.filters.text.replace(/[\r\n]/g, " ")
      let params = { 'dbName': that.filters.db, 'sql': sql };
      API.search(params).then(function(result) {
        if (result && result.code >= 0) {
          that.datas = [];
          that.data_keys = [];
          // console.log(result)
          let index = 0;
          for (var i in result.data) {
            that.datas.push(result.data[i]);
            that.data_keys.push([])
            for (var d in result.data[i][0]) {
              that.data_keys[index].push(d)
            }
            that.hasData = false;
            that.activeName = "数据1"

            let sql_history = that.sql_history

            let historyIndex = sql_history.findIndex(function(item) {
              return item.db == that.filters.db && item.sql.trim() == that.filters.text.trim()
            });

            if (historyIndex < 0) {

              sql_history.push({
                db: that.filters.db,
                sql: that.filters.text.trim(),
                time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
              })
            } else {
              // 否则更新时间
              sql_history[historyIndex].time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
            }
            // 重新排序
            sql_history.sort(function(a, b) {
              return Date.parse(b.time) - Date.parse(a.time)
            })

            // 如果超出删除最旧
            if (sql_history.length > 20) { that.sql_history.pop() }

            localStorage.setItem('sql_history', JSON.stringify(sql_history));

            index++

          }
        } else {
          that.$message.error({ showClose: true, message: result.popups.content, duration: 2000 });
        }
      }, function(err) {
        that.$message.error({ showClose: true, message: err.toString(), duration: 2000 });
      });
    },
    fillGenderoptions() {
      let that = this;
      API.dblist().then(function(result) {
        if (result && result.code >= 0) {
          that.genderoptions = result.data;
          // 获取历史数据

          if (localStorage.getItem('sql_history')) {
            that.sql_history = JSON.parse(localStorage.getItem('sql_history'))
          }

        } else {
          that.$message.error({ showClose: true, message: result.popups.content, duration: 2000 });
        }
      }, function(err) {
        that.$message.error({ showClose: true, message: err.toString(), duration: 2000 });
      });
    }
  },
  watch: {
    'filters.db'() {
      // 变化时获取表格
      this.queryTables();
    }
  },
  mounted() {
    this.fillGenderoptions();
  }
}

</script>
<style>
</style>
