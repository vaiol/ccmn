const state = {
  drawer: null,
  color: "success",
  image:
    "https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg"
};

const mutations = {
  setDrawer: (state, param) => (state.drawer = param),
  setImage: (state, param) => (state.image = param),
  setColor: (state, param) => (state.color = param)
};

export default {
  state,
  mutations,
  namespaced: true
};
