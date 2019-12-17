import httpRequest from './httpRequest';
import httpRequestError from './httpRequestError';

export const policiesService = {
  namespaced: true,
  state: {
    policies: [],
  },
  mutations: {
    GET_POLICIES(state) {
      httpRequest('api/policies', 'GET')
        .then(response => {
          state.policies = response.data;
        })
        .catch(err => {
          httpRequestError(err, 'api/policies');
          console.log('error GET_STORES');
          console.log(err);
        });
    },
  },
  getters: {
    get_policies: state => state.policies,
  },
  actions: {
    async getPolicies({ commit }) {
      commit('GET_POLICIES');
    },
  },
};
