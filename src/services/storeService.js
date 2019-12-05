/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import httpRequest from './httpRequest';
import httpRequestError from './httpRequestError';

export const storeService = {
  namespaced: true,
  state: {
    stores: []
  },
  mutations: {
    GET_STORES(state) {
      httpRequest('api/stores', 'GET')
        .then(result => {
          state.stores = [];
          for (const i in result.data) {
            const mag = {
              key: result.data[i].id,
              text: result.data[i].city,
              value: result.data[i].id,
            };
            state.stores.push(mag);
          }
        })
        .catch(err => {
          httpRequestError(err, 'api/stores');
          console.log('error GET_STORES');
        });
    },
  },
  getters: {
    get_stores: state => state.stores,
  },
  actions: {
    async getStores({ commit }) {
      commit('GET_STORES');
    },
  },
};
