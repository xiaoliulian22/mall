<template>
  <div>
    <vHeader />
    <div class="login">
      <el-row :gutter="100">
        <el-col :span="12">
          <img src="/static/images/bgs.png" alt="">
        </el-col>
        <el-col :span="12">
          <div class="loginleft">
            <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm">
            <h2>会员登录</h2>
            <el-form-item prop="user_id">
              <el-input prefix-icon="el-icon-user-solid" autocomplete="off" v-model="ruleForm.user_id" placeholder="邮箱/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="user_pass">
              <el-input type="password" v-model="ruleForm.user_pass" autocomplete="off" placeholder="密码">
                <img slot="prefix" src="/static/images/password.png" width="20" alt="">
              </el-input>
            </el-form-item>
            <el-row>
              <div class="tip">已有帐户？去<router-link to="/register" style="color: #FF0000">注册</router-link></div>
              <div class="center"><el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button></div>
            </el-row>
          </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <vFooter/> -->
  </div>
</template>

<script>
import vHeader from "@/components/vHeader";
import vFooter from "@/components/vFooter";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "login",
  components: {
    vHeader,
    vFooter
  },
  data() {
    var validateId = (rule, value, callback) => {
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if (value === "") {
        callback(new Error("请输入邮箱/手机号"));
      } else if(!((/^1[3456789]\d{9}$/.test(value)) || (reg.test(value)))){ 
        callback(new Error("邮箱或手机号码有误，请重填"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }else {
        callback();
      }
    };
    return {
      ruleForm: {
        user_id: "",
        user_pass: ""
      },
      rules: {
        user_id: [{ validator: validateId, trigger: "change" }],
        user_pass: [{ validator: validatePass, trigger: "change" }]
      }
    };
  },
  methods: {
    ...mapMutations(["setLogin","setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post("/api/users/login", this.ruleForm)
            .then(res => {
              if (res.data.user) {
                this.setLogin(true);
                this.setUser(res.data.user);
                this.$router.push("/index");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style lang="scss" scoped>
.login {
  min-width: 30%;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 1px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  /deep/ {
     .el-col {
      height: 631px;
    }
    .el-col:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-right: 1px solid #DBDBDB;
      padding: 0!important;
    }
    .el-input__prefix {
      left: 0;
      background: #C0C4CC;
      img {
      //   margin-left: 23px;
      // margin-top: 12px;
      padding: 9px 22px;
      }
    }
    .el-input__suffix {
      right: 0;
    }
    .el-input__inner {
      padding-left: 70px;
    }
    .el-input__icon {
      color: black;
      font-size: 20px;
      background: #C0C4CC;
      padding: 0 20px;
    }
    form {
      margin: 45px auto 20px;
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }
  }
}
.loginleft{
  border: 1px solid #DBDBDB;
  width: 560px;
  height: 631px;
  h2{
    font-size: 24px;
    margin-bottom: 48px;
  }
}
.tip {
  margin: 47px 0 49px;
}
</style>