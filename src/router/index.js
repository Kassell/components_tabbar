import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: 'tab',
      component: () => import("@/views/tab.vue"),
      meta: {
        tabbar: true, 
        title: "tab",
        default_icon: require("../assets/default.svg"),
        active_icon: require("../assets/active.svg")
      }
    }, {
      path: "/tab1",
      name: 'tab1',
      component: () => import("@/views/tab1.vue"),
      meta: {
        tabbar: true,
        title: 'tab1',
        default_icon: require("../assets/default.svg"),
        active_icon: require("../assets/active.svg")
      }
    }, {
      path: "/tab2",
      name: 'tab2',
      component: () => import("@/views/tab2.vue"),
      meta: {
        tabbar: true,
        title: "tab2",
        default_icon: require("../assets/default.svg"),
        active_icon: require("../assets/active.svg")
      }
    }, {
      path: "/tab3",
      name: 'tab3',
      component: () => import("@/views/tab3.vue"),
      meta: {
        tabbar: true,
        title: "tab3",
        default_icon: require("../assets/default.svg"),
        active_icon: require("../assets/active.svg")
      }
    }
  ]
})
