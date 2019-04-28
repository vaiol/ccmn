import moment from "moment";

const state = {
  siteId: null,
  startDate: moment()
    .subtract(3, "months")
    .format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
  interval: "daily"
};

const getters = {
  params: state => ({
    siteId: state.siteId,
    startDate: state.startDate,
    endDate: state.endDate
  }),
  interval: state => state.interval
};

const actions = {
  setPeriod: async function({ commit }, { startDate, endDate, interval }) {
    commit("PERIOD_SET", {
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      interval
    });
  },
  setSite: async function({ commit }, siteId) {
    commit("SITE_SET", { siteId });
  }
};

const mutations = {
  PERIOD_SET: (state, params) => {
    state.startDate = params.startDate;
    state.endDate = params.endDate;
    state.interval = params.interval;
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
