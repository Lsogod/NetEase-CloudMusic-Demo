import Vue from 'vue'
import Vuex from 'vuex'

// if (!isMobile) {
// // 当前设备不是移动设备
// alert('afafaf')
// }

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    eventComment: '',
    user: '',
  },
  mutations: {
    updateData(state, data) {
      state.eventComment = data
    },
    getUser(state) {
      return state.user
    },
    setUser(state, data) {
      state.user = data
    },
    clearUser(state) {
      state.user = ''
    },
  },
})

export default store
