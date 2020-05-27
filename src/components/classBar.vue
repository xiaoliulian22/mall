<template>
  <div class="class">
    <el-row type="flex" justify="center">
      <router-link :to="{name:'class',query:{sp:1}}">
        新鲜水果
      </router-link>
      <router-link :to="{name:'class',query:{sp:2}}">蔬菜</router-link>
      <router-link :to="{name:'class',query:{sp:3}}">杂油</router-link>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    handleClick() {
      this.$emit("handleSearch", this.value);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.class {
  a {
    padding: 0 60px;
    font-size: 30px;
  }
  /deep/ {
    .router-link-exact-active{
  color: red;
}
  }
}


</style>
