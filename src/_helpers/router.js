import Vue from "vue";
import Router from "vue-router";

import { authenticationService } from "../_services/authentication.service";
import { Role } from "./role";

import Home from "../views/Home";
import Admin from "../views/Admin";
import Devices from "../views/Devices";
import Policies from "../views/Policies";
import Entreprises from "../views/Entreprises";
import Applications from "../views/Applications";
import Policy from "../views/Policy.vue";
import Login from "../views/Login.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/devices",
      component: Devices
    },
    {
      path: "/admin/entreprises",
      component: Entreprises
    },
    {
      path: "/admin",
      component: Admin
    },
    {
      path: "/policies",
      component: Policies
    },
    {
      path: "/applications",
      component: Applications
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/policy/:id",
      component: Policy
    },

    // otherwise redirect to home
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: "/" });
    }
  }

  next();
});
