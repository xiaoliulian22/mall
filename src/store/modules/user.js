
// initial state
const state = {
  isLogin: false,
  user: {},
  loading: false
}

// getters
const getters = {
  getLogin: state => {
    return state.isLogin
  },

  getUser: state => {
    return state.user
  },

  getLoading: state => {
    return state.loading
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
  /**
   * 设置user
   * */
  setUser(state, obj) {
    state.user = obj
  },

  // 设置loading
  setLoading(state, obj) {
    state.loading = obj
  }
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
