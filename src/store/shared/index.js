export default {
  state: {
    loading: false,
    authError: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    // change the of status error in state
    setError(state, payload) {
      state.authError = payload;
    },
    // change the status of error back to null
    clearError(state) {
      state.authError = null;
    },
  },
  actions: {
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
};
