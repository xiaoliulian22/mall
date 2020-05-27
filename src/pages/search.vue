<template>
  <div>
    <vHeader @handleSearch="handleSearch" />
    <div class="class">
      <div class="lists">
        <div class="list_item" v-for="item in list" :key="item.name" @click="toDetail(item._id)">
          <img :src="item.url" :alt="item.name" width="400" />
          <p>{{item.name}}</p>
          <p>¥{{item.price}}</p>
        </div>
      </div>
    </div>
    <!-- <fixedBar /> -->
  </div>
</template>

<script>
import classBar from "@/components/classBar";
import vHeader from "@/components/vHeader";
import fixedBar from "@/components/fixedBar";
export default {
  name: "class",
  components: {
    classBar,
    fixedBar,
    vHeader
    // vFooter
  },
  data() {
    return {
      sp: "1",
      list: [],
      keywords : ''
    };
  },
  methods: {
    handleSearch(val){
        this.fetchList({keywords:val})
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick() {
      alert("button click");
    },
    toDetail(id) {
      this.$router.push(`/detail?id=${id}&sp=${this.sp}`);
    },
    fetchList(params){
      this.$get("api/goods/search", params)
      .then(res => {
        this.list = res
        console.log(res)
      })
    }
  },
  computed: {
    
  },
  created() {
    this.keywords = this.$route.query.keywords
    console.log(this.keywords)
    let params = {
      keywords : this.keywords
    }
    this.fetchList(params)
  },
};
</script>

<style lang="scss" scoped>
.class {
  width: 1440px;
  margin: 20px auto 10px;
  .lists {
    overflow: hidden;
    margin: 0 auto;
    width: 1240px;
    .list_item {
      width: 400px;
      height: 446px;
      margin-bottom: 40px;
      background-color: white;
      float: left;
      margin-right: 20px;
      cursor: pointer;
      &:nth-child(3n) {
        margin-right: 0px;
      }
      p:nth-child(2) {
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
        font-size: 20px;
        margin: 0 auto;
        text-align: center;
      }
      p:nth-child(3) {
        color: #CE1717;
        font-size: 26px;
      }
    }
  }
}
</style>
