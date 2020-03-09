/* eslint-disable */
<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-tabs type="border-card">
        <el-tab-pane label="常用组件">
          <ul class="models_list">
            <li
              class="models_list_item"
              v-for="(m, i) in models.usual"
              :key="i"
              :draggable="true"
              @dragstart="modelDrag($event, m)"
              @dragover.prevent
            >
              <img :src="m.img" />
              <span>{{ m.nameCn }}</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="图片组件">图片组件</el-tab-pane>
        <el-tab-pane label="商品组件">商品组件</el-tab-pane>
        <el-tab-pane label="其他组件">其他组件</el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="6" class="dispaly_wrapper">
      <div
        class="pre_view"
        @drop="targetDrop($event, 'new')"
        :draggable="false"
        @dragover.prevent
        @dragenter="targetDragEnter($event, 'new')"
        @dragleave="targetDragLeave($event, 'new')"
      >
        <div
          class="cp_card"
          v-for="(m, i) in components"
          :key="i"
          :ref="'cp_' + i"
          @drop="targetDrop($event, m, i, 'cp_' + i)"
          :draggable="false"
          @dragover.prevent
          @dragenter="targetDragEnter($event, m, 'cp_' + i)"
          @dragleave="targetDragLeave($event, m, 'cp_' + i)"
          @click="editorParams(m)"
        >
          <div class="cp_card_title">
            <h6>[{{ i + 1 }}]组件: {{ m.component }}</h6>
            <el-popconfirm
              confirmButtonText="删除"
              cancelButtonText="返回"
              icon="el-icon-info"
              iconColor="red"
              title="确定要删除这个组件吗？"
              @onConfirm="deleteComponent(m, i)"
            >
              <i slot="reference" class="el-icon-delete"></i>
            </el-popconfirm>
          </div>
          <div class="cp_card_content">
            <TepLoader :cpname="m.component" :params="m.params"> </TepLoader>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :span="8">
      <el-tabs type="border-card">
        <el-tab-pane label="页面配置" class="option">
          <el-col :span="24" class="option_item_row">
            <span class="option_item_label"> 页面标题</span>
            <el-input v-model="pageConfig.title"></el-input>
          </el-col>

          <el-col :span="24" class="option_item_row">
            <span class="option_item_label"> 页面URL后缀</span>
            http://www.xxxx.com/activity/html/
            <el-input v-model="pageConfig.uri"></el-input>
          </el-col>

          <el-col :span="24" class="option_item_row">
            <span class="option_item_label"> 背景色</span>
            <el-color-picker v-model="pageConfig.bg_color"></el-color-picker>
          </el-col>

          <el-col :span="24" class="option_item_row">
            <span class="option_item_label"> 背景图</span>
            <el-input v-model="pageConfig.bg_img"></el-input>
          </el-col>

          <el-col :span="24" class="option_item_row">
            <span class="option_item_label"> 页面发布时间</span>
            <el-date-picker
              v-model="pageConfig.publish_time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="组件配置" class="option">
          <!-- 通用配置项 -->
          <el-col
            :span="24"
            v-for="(k, i) in editor.common"
            :key="i"
            class="option_row"
          >
            <span class="option_label"> {{ k.name }}</span>
            <component
              :is="setComponent(k.type)"
              size="mini"
              class="option_editor"
              v-model="editor_params[k.key]"
            >
            </component>
         
          </el-col>

          <el-col :span="24">    <el-divider></el-divider></el-col>

          <!-- 列表配置项 -->
          <el-col
            v-if="editor_items && editor_items.length > 0"
            class="option_item"
            :span="24"
          >
          
            <span> 列表</span>
            <el-col
              :span="24"
              v-for="(item, index) in editor_items"
              class="option_item_card"
              :key="index"
            >
              <span> [第{{ index + 1 }}项] </span>
              <el-col
                :span="24"
                v-for="(k, i) in editor.item"
                :key="i"
                class="option_item_row"
              >
                <span class="option_item_label"> {{ k.name }}</span>
                <component
                  :is="setComponent(k.type)"
                  size="mini"
                  class="option_item_editor"
                  v-model="editor_items[index][k.key]"
                >
                </component>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-button type="info" size="mini" @click="addEditorItem"
                >+添加</el-button
              >
            </el-col>
          </el-col>
        </el-tab-pane>
        
      </el-tabs>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
@import "@assets/style/mainstyle.scss";
.option {
  padding: 5px;
  height: calc(100vh - 140px);
  overflow-y: scroll;
  font-size: 12px;

  span {
    font-size: 14px;
  }

  &_row {
    margin-bottom: 5px;
  }
  &_label {
    width: 20%;
    text-align: right;
    margin-right: 10px;
    color: $-color-text-regular;
    font-size: 12px;
  }

  &_item {
    padding: 10px 15px;

    &_card {
      border-radius: 2px;
      background: $-color-background_list;
      margin-bottom: 10px;
    }

    &_label {
      width: 15%;
      text-align: right;
      margin-right: 10px;
      color: $-color-text-regular;
      font-size: 12px;
    }
    &_row {
      margin-bottom: 10px;
    }
  }
}

.models_list {
  display: flex;
  padding: 0;
  margin-top: 15px;
  flex: 5;
  justify-content: space-around;
    font-size: 12px;

  &_item {
    width: 80px;
    height: 100px;
    text-decoration: none;
    display: block;
    text-align: center;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}

.dispaly_wrapper {
  width: 330px;
  height: 645px;
  -webkit-transform: translateY(-1%);
  margin: 0 56px 0 26px;
  background: url(/img/iphoneX.png) no-repeat center 0;
  background-size: 100%;

  .pre_view {
    position: absolute;
    top: 64px;
    left: 21px;
    right: 23px;
    bottom: 22px;
    overflow: hidden;
    border-radius: 0 0 35px 35px;
    border: 1px solid $-color-border;
    border-top: none;
    background-color: $-color-background;
    overflow-y: scroll;

    .cp_card {
      // &:hover{
      //   box-shadow: #a301c4 10px 10px 10px 10px;
      // }

      &_title {
        height: 30px;
        line-height: 30px;
        padding: 0 2px;
        border-top: 1px solid $-color-border;
        color: $-menu-color-text;
        background-color: $-menu-color-inline;

        h6 {
          padding: 0;
          margin: 0;
        }
      }

      &_content {
        margin-bottom: 5px;
      }
    }
  }
}
</style>

<script>
import TepLoader from "@/model/html_model/index";
import API from "@api/api_htmlbulider";

export default {
  data() {
    return {
      pageConfig:{
        title:"营销页面",
        uri:"",
        bg_color:"#ffffff",
        bg_img:"",
        publish_time:new Date()
      },
      components: [],
      currentDrag: null,
      draging: {
        status: false,
        newX: 0,
        newY: 0,
        startX: 0,
        startY: 0,
        component: null,
        isNew: true,
        enter: "",
        leave: ""
      },
      editor: {},
      editor_params: {},
      editor_items: [],
      models: {}
    };
  },
  components: {
    TepLoader: TepLoader,
    // 引入特定编辑组件
    "ed-target": () => import("@/model/html_editor_model/ed_target.vue"),
    "ed-image": () => import("@/model/html_editor_model/ed_image.vue"),
    "ed-html": () => import("@/model/html_editor_model/ed_html.vue")
  },
  methods: {
    editorParams(m) {
      this.editor = m.paramsConfig;
      this.editor_params = m.params;
      this.editor_items = m.params.items;

      console.log(m)
    },
    addEditorItem() {
      let _this = this;

      if (
        _this.editor.itemLimit &&
        _this.editor_items.length < _this.editor.itemLimit
      ) {
        let newItem = {};
        this.editor.item.forEach(o => {
          if (o.default) {
            newItem[o.key] = o.default;
          } else {
            newItem[o.key] = _this.defaultValue(o.type);
          }
        });

        _this.editor_items.push(newItem);
      } else {
        _this.$message({
          message: "列表数目超出组件限制",
          type: "warning"
        });
      }
    },
    setComponent(type) {
      if (type === "Number") {
        return "el-input-number";
      } else if (type === "image") {
        return "ed-image";
      } else if (type ==="target") {
        return "ed-target";
      }  else if (type ==="html") {
        return "ed-html";
      }else {
        return "div";
      }
    },
    defaultValue(type) {
      switch (type) {
        case "Number":
          return 0;
          break;
        case "String":
          return "";
          break;
        case "image":
          return "";
          break;
        case "target":
          return "";
          break;
          case "html":
          return "";
          break;
        default:
          return null;
      }
    },
    modelDrag(e, m) {
      console.log(e);
      this.currentDrag = m;
      (this.draging.status = true), (this.draging.startX = e.clientX);
      this.draging.startY = e.clientY;
      this.draging.component = m;
      this.draging.isNew = true;
    },
    targetDrop(e, m, index, ref) {
      let _this = this;
      if (this.draging.status) {
        this.draging.status = false;

        if (this.draging.isNew) {
          let newComponent = {
            component: this.draging.component.name,
            paramsConfig: this.draging.component.params,
            params: {}
          };

          // 初始化默认值
          newComponent.paramsConfig.common.forEach(o => {
            if (o.default) {
              newComponent.params[o.key] = o.default;
            } else {
              newComponent.params[o.key] = _this.defaultValue(o.type);
            }
          });

          if (
            newComponent.paramsConfig.item &&
            newComponent.paramsConfig.item.length > 0
          ) {
            if (newComponent.paramsConfig.itemCount) {
              newComponent.params.items = new Array(
                newComponent.paramsConfig.itemCount
              );
            } else {
              newComponent.params.items = new Array(1);
            }

            let newItem = {};
            newComponent.paramsConfig.item.forEach(o => {
              if (o.default) {
                newItem[o.key] = o.default;
              } else {
                newItem[o.key] = _this.defaultValue(o.type);
              }
            });

            newComponent.params.items.fill(newItem);
          }

          if (m === "new") {
            this.components.push(newComponent);
          } else {
            this.$refs[ref][0].style = "";
            m.newcomponent = null;
            this.components.splice(index, 0, newComponent);
          }

          // 激活编辑
          this.editorParams(newComponent);

          // 处理样式

          if (this.$refs[this.draging.enter]) {
            this.$refs[this.draging.enter][0].style = "";
          }
          if (this.$refs[this.draging.leave]) {
            this.$refs[this.draging.leave][0].style = "";
          }
        }
      }
    },
    targetDragEnter(e, m, ref) {
      if (m === "new") {
      } else {
        this.draging.enter = ref;

        if (this.$refs[this.draging.leave]) {
          this.$refs[this.draging.leave][0].style = "";
        }

        this.$refs[this.draging.enter][0].style =
          "border-top:15px #503cb3 solid;";

        m.newcomponent = this.draging.component.name;
      }
    },
    targetDragLeave(e, m, ref) {
      if (m === "new") {
      } else {
        this.draging.leave = ref;
        m.newcomponent = null;
      }
    },
    deleteComponent(m, i) {
      console.log(i);
    }
  },
  mounted() {
    let _this = this;
    API.getModels().then(function(result) {
      _this.models = result.data;
    });
  },
  computed: {}
};
</script>
