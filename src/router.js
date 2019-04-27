import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/analytics" },
    {
      path: "/location",
      name: "Location",
      component: () => import("./views/Location.vue")
    },
    {
      path: "/analytics",
      name: "Analytics",
      component: () => import("./views/Analytics.vue")
    }
  ]
});
