<template>
  <div>
    <vHeader @handleSearch="handleSearch" />
    <div class="goonshopp">
        <router-link :to="{name:'class',query:{sp:sp}}" v-if="sp && sp!=='undefined'">继续购物</router-link>
        <router-link :to="{name:'index'}" v-else>继续购物</router-link>
    </div>
    <el-table
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
    >
      <el-table-column label="商品信息" min-width="300" align="center">
        <template slot-scope="scope">
            <img width="100px" :src="scope.row.url" alt="">
            <span class="title">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" min-width="200"  align="center">
          <template slot-scope="scope">
           ¥ {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="count" min-width="200" label="购买数量" show-overflow-tooltip  align="center"></el-table-column>
      <el-table-column prop="totalprice" min-width="200" label="合计" show-overflow-tooltip  align="center"></el-table-column>
    <div v-if="list.length" slot="append" style="padding: 120px 0 60px;">
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-row type="flex" justify="space-around" align="middle">
            <div>
              总价：<span class="f-red">￥{{money}}</span>
            </div>
            <el-button style="width:150px" type="danger" @click="pay">去结算</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    </el-table>
  </div>
</template>

<script>
import vHeader from "@/components/vHeader";
export default {
  data() {
    return {
      sp:null,
      list: [],
    };
  },
  computed:{
    money(){
      let money = 0;
      this.list.forEach(item => {
        money += item.price*item.count
      })
      return money
    },
    count(){
      let count = 0;
      this.list.forEach(item => {
        count += item.count
      })
      return count;
    }
  },
  methods: {
    handleSearch(val) {
      this.$router.push(`/search?keywords=${val}`)
    },
  },
  created() {
    this.sp = this.$route.query.sp
  },
  watch: {},
  components: {
    vHeader
  }
};
</script>

<style lang="scss" scoped>
.goonshopp {
  width: 200px;
  height: 48px;
  background: #254000;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  float: right;
  margin-right: 100px;
  clear: both;
  cursor: pointer;
  a {
    color: white;
  }
}
.title{
    width: 150px;
    display: inline-block;
}
.el-table {
 /deep/ .cell {
     display: flex;
     align-items: center;
     justify-content: center;
 }
}
.t-r {
  text-align: right;
}
.tip{
  color: red;
  font-size: 22px;
  margin-bottom: 22px;
  text-align: center;
}
.pagImg{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
