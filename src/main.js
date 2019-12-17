import App from "./App.vue";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";

import { router } from "./_helpers/router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import VueQrcode from "@chenfengyuan/vue-qrcode";

Vue.use(VueMaterial);
Vue.use(Vuex);
Vue.use(Vuelidate);

Vue.component(VueQrcode.name, VueQrcode);

Vue.use(VueAxios, axios);

new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");
