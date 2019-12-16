import httpRequest from './httpRequest';
import httpRequestError from './httpRequestError';

export const applicationService = {
  namespaced: true,
  state: {
    playApps: [],
    webApps: [],
  },
  mutations: {
    GET_APPS(state) {
      httpRequest('api/apps', 'GET')
        .then(result => {
          state.playApps = result.data.playApps;
          state.webApps = result.data.webApps;
          console.log('GET_APPS');
        })
        .catch(err => {
          httpRequestError(err, 'api/apps');
          console.log('error GET_APPS');
        });
    },
    REMOVE_APP(state, app) {
      httpRequest('api/apps/delete', 'POST', app)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          httpRequestError(err, 'api/apps');
          console.log('error GET_APPS');
        });
    },
    SAVE_PLAYSTORE_APP(state, source) {
      httpRequest('api/apps/play', 'POST', source)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          httpRequestError(err, 'api/apps/play');
          console.log(err);
        });
    },
  },
  getters: {
    get_web_apps: state => state.webApps,
    get_play_apps: state => state.playApps,
  },
  actions: {
    async getApps({commit}) {
      commit('GET_APPS');
    },
    async savePlayStoreApps({commit}, source) {
      commit('SAVE_PLAYSTORE_APP', source);
    },
    async removeApp({commit}, app) {
      commit('REMOVE_APP', app);
    },
  },
};
