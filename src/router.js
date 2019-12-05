import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Devices from "./views/Devices";
import Policies from "./views/Policies";
import Applications from "./views/Applications";
// import Users from './views/Users.vue';
import Policy from "./views/Policy.vue";
// import Enterprises from './views/Enterprises.vue';
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/devices",
      name: "devices",
      component: Devices
    },
    {
      path: "/policies",
      name: "policies",
      component: Policies
    },
    {
      path: "/applications",
      name: "applications",
      component: Applications
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/policy/:id",
      name: "policy",
      component: Policy
    }
  ]
});

// {
//   path: '/users',
//   name: 'users',
//   component: Users,
// },

// {
//   path: '/entreprises',
//   name: 'entreprises',
//   component: Enterprises,
// },
