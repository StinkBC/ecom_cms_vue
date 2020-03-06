/* eslint-disable */
<template>
  <el-row :gutter="20">
    <el-col :span="8">
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
    <el-col :span="8" class="dispaly_wrapper">
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
        <el-tab-pane label="组件配置">配置项 </el-tab-pane>
        <el-tab-pane label="统计配置">统计配置</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
@import "@assets/style/mainstyle.scss";

.models_list {
  display: flex;
  padding: 0;
  margin-top: 15px;
  flex: 5;
  justify-content: space-around;

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
import API from "@api/api_htmlbulider"

export default {
  data() {
    return {
      components: [
        // { component: "banner", params: [] },
        // { component: "htmlcard", params: [] }
      ],
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
      models: {}
    };
  },
  components: { TepLoader },
  methods: {
    editorParams(m) {
      this.editor = m.params;
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
      if (this.draging.status) {
        this.draging.status = false;

        if (this.draging.isNew) {
          if (m === "new") {
            this.components.push({
              component: this.draging.component.name,
              params: []
            });
          } else {
            this.$refs[ref][0].style = "";
            m.newcomponent = null;
            this.components.splice(index, 0, {
              component: this.draging.component.name,
              params: []
            });
          }
        }
      }
    },
    targetDragEnter(e, m, ref) {
      if (m === "new") {
      } else {
        this.draging.enter = ref;
        this.$refs[this.draging.leave][0].style = "";
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
    deleteComponent(m,i){
      console.log(i)
    }
  },
  mounted(){
    let _this=this
    API.getModels().then(function(result) {
        _this.models=result.data
      });

  },
  computed: {}
};
</script>
