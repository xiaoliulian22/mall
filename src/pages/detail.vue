<template>
<div>
<vHeader @handleSearch="handleSearch" />
 <div class="content">
    <div class="left">
      <img :src="goods.url" alt="">
    </div>
    <div class="right">
      <div class="right_con">
        <p>{{goods.name}}</p>
        <p>价格：<span>¥ {{goods.price}}</span></p>
        <p>
          <span>促</span>
          <span>{{goods.cu}}</span>
        </p>
        <p>
          <span>数量：</span>
          <el-input-number v-model="count" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </p>
        <p>
          <img src="/static/images/shop.png" alt="">
          <span @click="addGoods">
            加入购物车
          </span>
        </p>
      </div>
    </div>
  </div>
</div>
 
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import dateTime from "@/assets/js/datetime";
import vHeader from "@/components/vHeader";
export default {
  name: "detail",
  components: {
    vHeader
  },
  data() {
    return {
      flag: false,
      id: null,
      count: 1,
      goods:{}
    };
  },
  created() {
    console.log(this.$route.query.id);
    // debugger
    this.id = this.$route.query.id;
    this.fetchDetail(this.id)
  },
  methods: {
    handleSearch(val) {
      this.$router.push(`/search?keywords=${val}`)
    },
    addGoods() {
      const { title, name,price,url, } = this.goods;
      const { count } = this
      const { user_id } = this.getUser
      let params = {
        name,
        user_id,
        id: (Math.random() + 1) *1000,
        title,
        price,
        count,
        totalprice: (parseFloat(price) * parseFloat(count)).toString(),
        url,
        state: 0,
        create_time: dateTime.formatData(),
      }
      this.$post("api/cart/add", params)
      .then(res=>{
        this.$message.success(res.message)
        this.$router.push(`/shop?sp=${this.$route.query.sp}`)
      })
      .catch(err => {})
    },
    handleChange(value) {
        console.log(value);
      },
      beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      //这句话没有实际的作用，但是如果不写，出不来动画效果
      //可以认为 el.offsetWidth会强制动画刷新
      el.offsetWidth;
      el.style.transform = "translate(540px,-545px)";
      el.style.transition = "all 1.3s ease";

      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
    fetchDetail(_id){
      this.$get("api/goods/goodsDetail",{_id}).then(res=>{
        this.goods = res.data
      })
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style lang="scss" scoped>
.content{
  width: 80%;
  display: flex;
  margin: 0 auto;
  .left{
    height: 500px;
    width: 50%;
    text-align: center;
    border-right: 1px solid #979797;
    img{
      width: 500px;
      height: 500px;
    }
  }
  .right{
    width: 50%;
    height: 500px;
    .right_con{
      width: 500px;
      height: 500px;
      float: right;
      clear: both;
      p{
        &:nth-child(1){
          font-size: 24px;
          margin-bottom: 70px;
        }
        &:nth-child(2){
          font-size: 22px;
          padding-bottom:10px ;
          span{
            color: #FF0000;
          }
        }
        &:nth-child(3){
          border-top: 1px solid #979797;
          padding: 10px 0;
          span{
            &:nth-child(1){
              color: width;
              display: inline-block;
              width: 30px;
              height: 30px;
              background: #DD2C00;
              text-align: center;
              line-height: 30px;
            }
          }
        }
        &:nth-child(4){
          margin-top: 70px;
          margin-bottom: 65px;
        }
        &:nth-child(5){
          width: 264px;
          height: 68px;
          background: #33691E;
          display: flex;
          align-items: center;
          border-radius: 6px;
          cursor: pointer;
          span{
          font-size: 24px;
          color: white;
          text-align: center;
          }
          img{
            width: 44px;
            height: 44px;
            margin: 0 20px 0 20px;
          }
        }
      }
    }
  }
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
}
</style>