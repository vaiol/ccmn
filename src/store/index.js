import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import params from "./modules/params";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    app,
    params
  },
  strict: debug
});
