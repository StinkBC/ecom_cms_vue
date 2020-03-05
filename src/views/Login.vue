<template>
  <div class="login">
  

    <el-card shadow="always" class="login_card">
     <el-row>
       <el-col :span="12" class="login_card_img">
        <div >
      <h1>后台管理系统</h1>
    </div>
       </el-col>
    <el-col :span="12" class="login_card_form">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="60px"
        
      >
        <el-form-item label="登录名" prop="user" class="login_card_form_item">
          <el-input v-model="loginForm.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" class="login_card_form_item">
          <el-input
            type="password"
            v-model="loginForm.pwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label=" " class="login_card_form_item">
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      内部后台系统，账号遇到问题请联系管理员
    </el-col>
     </el-row>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
@import "@assets/style/mainstyle.scss";
.login {
  height: calc(100vh);
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: $-menu-color-background;

 

  &_card {
    box-sizing: border-box;
    width: 40%;
    max-width: 850px;
    padding: 0;
    display: flex;
    flex:2;
    justify-content:space-around;
    align-items: center;

    .el-card__body{
       padding: 0 !important;
    }

    &_img{
      width: 50%;
      height: 100%;
      
       box-sizing: border-box;
      background-color: $-color-primary;
      

    }
    &_form {
    width: 50%;
    
     box-sizing: border-box;
    border-bottom: 1px $-color-border solid;

    &_item {
      width: 100%;
    }
  }
  }


  
}
</style>

<script>
export default {
  data() {
    return {
      loginForm: {
        user: "",
        pwd: ""
      },
      rules: {
        pwd: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入密码"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        user: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入登录名"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.$route.query && _this.$route.query.from) {
            _this.$router.push("_this.$route.query.from");
          } else {
            _this.$router.push("/dashboard");
          }
        } else {
          console.log("填写错误");
          return false;
        }
      });
    }
  }
};
</script>
