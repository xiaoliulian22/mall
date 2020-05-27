<template>
  <el-header>
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <div class="logo">
          <img @click="reset('',true)" src="/static/images/logo.png" alt="logo" srcset />
        </div>
      </el-col>
      <el-col :span="8" >
        <div class="search" v-show="$route.name !=='shop' && $route.name !=='detail'">
          <div class="title" v-if="is_login_register">{{title}}</div>
          <el-input
            v-else
            placeholder="请输入要搜索的内容"
            v-model="value"
            class="input-with-select"
            @keyup.native.enter="handleClick"
          >
            <el-button
              style="width: 150px"
              size="large"
              slot="append"
              icon="el-icon-search"
              @click="handleClick"
            ></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="userOpt" v-show="showRight">
          <el-row type="flex" justify="end">
            <el-col :span="6" v-show="!getLogin">
              <span @click="reset('login',false)">登录</span>
            </el-col>
            <el-col :span="6" v-show="!getLogin">
              <span @click="reset('register',false)">注册</span>
            </el-col>
            <el-col :span="12" v-show="getLogin">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover">
                <ul>
                  <li @click="logout" style="cursor: pointer;">退出</li>
                </ul>
                <div slot="reference">欢迎登录, <span>{{getUser.name || getUser.user_id}}</span></div>
              </el-popover>
              
            </el-col>
            <el-col :span="4">
              <el-badge :is-dot="list.length?true:false">
                <span @click="reset('shop',true)">购物车</span>
              </el-badge>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: "",
      path: "",
      title: "登录",
      showOp: true,
      showRight: true,
      is_login_register: false,
      list: []
    };
  },
  methods: {
    ...mapMutations(["setLogin"]),
    handleClick() {
      this.$emit("handleSearch", this.value);
      // debugger
      
    },
    fetchList(){
      this.$get('api/cart/get',{id: this.getUser.user_id}).then(res=> {
        this.list = res.list
      })
    },
    getTitle(){
      switch (this.path) {
        case "login":
          this.title = "登录"
          break;
        case "register":
          this.title = "注册"
          break;
        default:
          break;
      }
    },
    reset(path,flag){
      this.path = path;
      if(path === 'shop'){
        if(this.getLogin){
        this.$router.push(`/${path}`)
      }else{
        this.$message({
          type: "info",
          message: "您还未登录,请先登录"
        })
        setTimeout(()=>{
          this.$router.push(`/login`)
        },2000)
      }
      }else{
        this.$router.push(`/${path}`)
      }
    },
    logout(){
      this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setLogin(false)
          this.$router.replace("/login")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  computed: {
    ...mapGetters(["getUser","getLogin"])
  },
  created() {
    this.fetchList();
    console.log(this.$route.name)
      if(this.$route.name === 'register'){
        this.title = '注册'
        this.is_login_register = true
        this.showRight = false
      }else if(this.$route.name === 'login'){
        this.title = '登录'
        this.is_login_register = true
        this.showRight = false
      }else if(this.$route.name === 'myorder'){
        this.title = '我的订单'
        this.is_login_register = true
        this.showRight = true
      }else{
        this.is_login_register = false
        this.showRight = true
      }
  },
  watch: {
    $route(newValue,oldValue){
      this.path = newValue.name
      this.getTitle()
      console.log('sss')
      if (newValue.name === 'login' || newValue.name === 'register') {
        this.is_login_register = true
        this.showRight = false
      } else {
        this.is_login_register = false
        this.showRight = true
      }
    },
    // list: {
    //         handler: function (val, oldVal) { 
    //           if(val.length == 0){

    //           }
    //           console.log('new', val);
    //           console.log(val.length)
    //           console.log('oldVal', oldVal)
    //           console.log(oldVal.length)
    //         },
    //         deep: true
    //       },
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  height: 100px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /deep/ {
    .el-row {
      width: 100%;
    }
  }
  color: #b0b0b0;
  background-color: white;
  .logo {
    img {
      cursor: pointer;
    }
  }
  .userOpt {
    width: 368px;
    float: right;
    display: flex;
    align-items: center;
    span {
      color: black;
      font-size: 15px;
      cursor: pointer;
    }
  }
  .search {
    width: 600px;
    .title {
      margin-left:190px ;
      font-size:36px;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
  }
}
/deep/ .el-badge__content.is-fixed {
  top: -5px;
  right: 5px
}
</style>
