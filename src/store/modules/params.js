const state = {
  siteId: null,
  startDate: new Date(),
  endDate: new Date()
};

const getters = {
  params: state => ({
    siteId: state.siteId,
    startDate: state.startDate,
    endDate: state.endDate
  })
};

const actions = {
  setPeriod: async function({ commit }, period) {
    commit("PERIOD_SET", period);
  },
  setSite: async function({ commit }, siteId) {
    commit("SITE_SET", { siteId });
  }
};

const mutations = {
  PERIOD_SET: (state, params) => {
    state.startDate = params.startDate;
    state.endDate = params.endDate;
  },
  SITE_SET: (state, params) => {
    state.siteId = params.siteId;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};
