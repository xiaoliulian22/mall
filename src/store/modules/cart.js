
// initial state
const state = {
    cartList: [
        {
            title: "【基地直发】枝纯星球草莓金星礼盒348g*2盒装21g以上/个",
            price: 168.00,
            count: 1,
            totalprice:168.00,
            url:'/static/images/cao.png'
        },
        {
            title: "【基地直发】四川不知火柑2.5kg礼盒装",
            price: 68.00,
            count: 2,
            totalprice:136.00,
            url:'/static/images/ganju.png'
        },
    ],
    user: {},
    loading: false
  }
  
  // getters
  const getters = {
    getLogin: state => {
      return state.isLogin
    },
  }
  
  
  // mutations
  const mutations = {
    /**
     * 设置flag
     * */
    setLogin(state, flag) {
      state.isLogin = flag
    },
  }
  
  // actions
  const actions = {
  
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }
  