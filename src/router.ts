import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const loadView = (view: string) => {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
};

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/view",
      name: "view",
      component: loadView("Viewer")
    },
    {
      path: "/pixiv",
      name: "pixiv",
      component: loadView("Pixiv")
    }
  ]
});
