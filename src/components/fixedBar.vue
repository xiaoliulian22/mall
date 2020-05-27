<template>
  <ul class="fixedBar">
    <li>
      <div>
        <img src="/static/images/phone.png" alt />
      </div>
      <span>手机APP</span>
    </li>
    <li>
      <div>
        <img src="/static/images/user.png" alt />
      </div>
      <span>个人中心</span>
    </li>
    <li>
      <div>
        <img src="/static/images/set.png" alt />
      </div>
      <span>人工服务</span>
    </li>
    <li>
      <div>
        <img src="/static/images/people.png" alt />
      </div>
      <span>售后服务</span>
    </li>
    <li>
      <div>
        <img src="/static/images/cart.png" alt />
      </div>
      <span>购物车</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.fixedBar {
  width: 80px;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 40px;
  }
  ul {
    background: #757575;
  }
  li {
    height: 92px;
    margin-bottom: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    color: #757575;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
