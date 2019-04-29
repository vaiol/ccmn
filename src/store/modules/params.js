import moment from "moment";

const state = {
  siteId: null,
  startDate: moment()
    .subtract(1, "months")
    .format("YYYY-MM-DD"),
  endDate: moment().format("YYYY-MM-DD"),
  interval: "daily"
};

const getters = {
  params: state => {
    const res = {
      siteId: state.siteId,
      startDate: state.startDate,
      endDate: state.endDate
    };
    if (res.startDate === res.endDate) {
      res.date = res.startDate;
    }
    return res;
  },
  interval: state => state.interval
};

const actions = {
  setPeriod: async function({ commit }, { startDate, endDate }) {
    const start = moment(startDate).format("YYYY-MM-DD");
    const end = moment(endDate).format("YYYY-MM-DD");
    const interval = start === end ? "hourly" : "daily";
    commit("PERIOD_SET", {
      startDate: start,
      endDate: end,
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
