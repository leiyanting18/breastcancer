import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    id: '',
    username: '',
    isAdmin: '',
  },
  getters: {},
  mutations: {
    updateUsername(state, value) {
      state.username = value
    },
    updateId(state, value) {
      state.id = value
    },
    updateIsAdmin(state, value) {
      state.isAdmin = value
    }
  },
  actions: {},
  modules: {}
})