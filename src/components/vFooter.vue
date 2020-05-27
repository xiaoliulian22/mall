<template>
  <el-footer>
    <span>客服热线：029-34513576</span>
    <div style="margin: 20px"></div>
    <span>所有图片均受著作权保护未经个人允许不得使用</span>
  </el-footer>
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
.el-footer {
  padding: 20px;
  color: #333;
  text-align: center;
  height: auto !important;
  background-color: white;
}
</style>
