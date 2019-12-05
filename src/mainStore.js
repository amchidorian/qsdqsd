import Vue from 'vue';
import Vuex from 'vuex';

import { storeService } from './services/storeService';
import { clientService } from './services/clientService';
import { policiesService } from './services/policiesService';
import { policyService } from './services/policyService';
import { deviceService } from './services/deviceService';
import { authService } from './services/authService';
import { applicationService } from './services/applicationService';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    storeService,
    clientService,
    policyService,
    policiesService,
    deviceService,
    authService,
    applicationService,
  },
});
