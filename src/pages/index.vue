<template>
  <div>
    <el-main>
       <vHeader @handleSearch="handleSearch" />
      <classBar />
      <div class="bannerWrap">
        <div class="banner">
          <el-carousel indicator-position="none">
            <el-carousel-item v-for="item in bannerList" :key="item.path">
              <div
                class="bannerItem"
                :style="{'background-image': `url(${item.path})`}"
              ></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="sections">
        <div class="titles">水果专场</div>
        <el-row type="flex" justify="space-between">
          <el-col :span="7" v-for="item in fruitList" :key="item.name">
            <img :src="item.url" :alt="item.name" width="356" height="329" @click="toDetail(item._id)"/>
            <div class="mask">
              <div>{{item.name}}</div>
              <div>{{item.sub_title}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="sections">
        <div class="titles">蔬菜专场</div>
        <el-row type="flex" justify="space-between">
          <el-col :span="7" v-for="item in vegetableList" :key="item.name">
            <img :src="item.url" :alt="item.name" width="356" height="329" @click="toDetail(item._id)"/>
            <div class="mask">
              <div>{{item.name}}</div>
              <div>{{item.sub_title}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="sections">
        <div class="titles">杂粮专场</div>
        <el-row type="flex" justify="space-between">
          <el-col :span="7" v-for="item in grainList" :key="item.name">
            <img :src="item.url" :alt="item.name" width="356" height="329" @click="toDetail(item._id)"/>
            <div class="mask">
              <div>{{item.name}}</div>
              <div>{{item.sub_title}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <!-- <vFooter /> -->
    <!-- <fixedBar /> -->
  </div>
</template>

<script>
import vHeader from "@/components/vHeader";
import classBar from "@/components/classBar";
import fixedBar from "@/components/fixedBar";
import vFooter from "@/components/vFooter";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "index",
  components: {
    vHeader,
    classBar,
    fixedBar,
    vFooter
  },
  data() {
    return {
      value: "",
      bannerList: [
        {
          path: "/static/images/banner1.png",
          id: "b_0"
        },
        {
          path: "/static/images/banner2.png",
          id: "b_1"
        },
        {
          path: "/static/images/banner3.png",
          id: "b_2"
        }
      ],
      fruitList: [],
      vegetableList: [],
      grainList: []
    };
  },
  methods: {
    ...mapMutations(["setLogin"]),
    handleSearch(val) {
      this.$router.push(`/search?keywords=${val}`)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick() {
      alert("button click");
    },
    toDetail(id) {
      this.$router.push(`/detail?id=${id}`);
    },
    fetList(){
      this.$get("api/goods/goodsList",{
        type: 1,
        is_hot: 1
      })
      .then(res => {
        this.fruitList = res.list
      })

      this.$get("api/goods/goodsList",{
        type: 2,
        is_hot: 1
      })
      .then(res => {
        this.vegetableList = res.list
      })

      this.$get("api/goods/goodsList",{
        type: 3,
        is_hot: 1
      })
      .then(res => {
        this.grainList = res.list
      })

      
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  created(){
    this.fetList()
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  width: 1440px;
  margin: 0 auto;
  overflow: inherit;
  .search {
    position: relative;
    width: 100%;
    height: 80px;
    .searchItemContainer {
      position: relative;
      height: 100%;
      .searchItem {
        padding: 0 20px;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        &:hover {
          .searchItemDrop {
            // display: block;
            opacity: 1;
            height: 100px;
          }
        }
        .searchItemDrop {
          width: 100%;
          height: 0;
          opacity: 0;
          position: absolute;
          left: 0;
          top: 80px;
          z-index: 4;
          background: white;
          transition: all 0.3s ease;
        }
      }
    }
  }

  .bannerWrap {
    height: 460px;
    position: relative;
    margin-top: 20px;
    .slideWrap {
      position: relative;
      color: #fff;
      z-index: 3;
    }
    .slideMenu {
      width: 234px;
      line-height: 42px;
      background: rgba(105, 101, 101, 0.6);
      .slideItem {
        cursor: pointer;
      }
    }
    .right {
      background: white;
      height: 460px;
      box-sizing: border-box;
      color: black;
      .showFl {
        // background: white;
        padding: 10px;
        height: 100%;
        > div {
          height: 100%;
        }
      }
    }
    .banner {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      /deep/ {
        .el-carousel__container {
          height: 460px;
        }
        .el-carousel {
          height: 100%;
          .el-carousel__item {
            height: 100%;
            .bannerItem {
              width: 90%;
              height: 100%;
              background-size: cover;
              margin: 0 auto;
            }
            .demo-image__placeholder {
              .block,
              .el-image {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }

  .sections {
    width: 90%;
    height: 491px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 4px 4px 4px #ccc;
    background-color: white;
    .titles {
      font-size: 36px;
      font-family: STXingkaiSC-Bold, STXingkaiSC;
      font-weight: bold;
      color: rgba(15, 92, 47, 1);
      line-height: 50px;
      padding: 32px 0;
    }
    /deep/ {
      .el-col {
        text-align: center;
        position: relative;
        overflow: hidden;
        &:hover {
          cursor: pointer;
          .mask {
            bottom: 0px;
          }
        }
        .mask {
          width: 100%;
          height: 115px;
          background:rgba(255,255,255,0.8);
          position: absolute;
          bottom: -115px;
          left: 0;
          transition: all .4s ease-in-out;
          div {
            &:nth-child(1) {
              height:50px;
              font-size:36px;
              font-weight:bold;
              color:rgba(4,12,7,1);
              line-height:86px;
            }
            &:nth-child(2) {
              height:50px;
              font-size:20px;
              font-weight:bold;
              color:rgba(111,111,111,1);
              line-height:70px;
            }
          }
        }
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
