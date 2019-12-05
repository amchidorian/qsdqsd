import App from "./App.vue";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

import mainStore from "./mainStore";
import VueRouter from "vue-router";
import routes from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

new Vue({
  router: routes,
  store: mainStore,
  render: h => h(App)
}).$mount("#app");
