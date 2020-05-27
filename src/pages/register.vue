<template>
  <div>
    <vHeader/>
    <div class="register">
      <el-row :gutter="100">
        <el-col :span="12">
          <img src="/static/images/bgs.png" alt="">
        </el-col>
        <el-col :span="12">
          <div class="fromrigh">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              class="form">
              <h2>会员注册</h2>
              <el-form-item prop="userId">
                <el-input prefix-icon="el-icon-user-solid" autocomplete="off" v-model="ruleForm.userId" placeholder="邮箱/手机号"></el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码">
                  <img slot="prefix" src="/static/images/password.png" width="20" alt="">
                </el-input>
                <!-- <el-input prefix-icon="el-icon-s-check" type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input> -->
              </el-form-item>
              <el-form-item prop="vPass">
                <el-input type="password" v-model="ruleForm.vPass" autocomplete="off" placeholder="确认密码">
                  <img slot="prefix" src="/static/images/password.png" width="20" alt="">
                </el-input>
              </el-form-item>
              <el-row>
                <div class="tip">已有帐户？去<router-link to="/login" style="color: #FF0000">登陆</router-link></div>
                <div class="center"><el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">注册</el-button></div>
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
export default {
  name: "register",
  components: {
    vHeader,
    vFooter
  },
  data() {
    var validateUserId = (rule, value, callback) => {
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
      console.log(reg.test(value))
      if (value === "") {
        callback(new Error("请输入邮箱/手机号"));
      } else if(!((/^1[3456789]\d{9}$/.test(value)) || (reg.test(value)))){ 
        callback(new Error("邮箱格式不正确或手机号码有误，请重填"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp("^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$");
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(!reg.test(value)){
        callback(new Error('密码格式有误,至少8个字符，至少1个字母，1个数字和1个特殊字符'))
      }else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      code: "",
      ruleForm: {
        userId: "",
        pass: "",
        vPass: ""
      },
      rules: {
        userId: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { validator: validateUserId, trigger: "change" }
        ],
        pass: [{ validator: validatePass, trigger: "change" }],
        vPass: [{ validator: validatePass2, trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post("/api/users/register", {
            userId: this.ruleForm.userId,
            pass: this.ruleForm.pass,
          })
          .then(res=> {
            this.$message.success(res.message)
            this.$router.replace('/login')
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCode() {
      this.code = parseInt((Math.random() + 1) * 100000);
    }
  },
  created() {
    this.getCode();
  }
};
</script>

<style lang="scss" scoped>
.register {
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
      .verify {
        height: 100%;
        cursor: pointer;
        border: 1px solid #ccc;
      }
      .el-form-item.is-required:not(.is-no-asterisk)
        .el-form-item__label-wrap
        > .el-form-item__label:before,
      .el-form-item.is-required:not(.is-no-asterisk)
        > .el-form-item__label:before {
        display: none;
      }
    }
  }
}
.fromrigh{
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