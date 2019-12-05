/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import httpRequest from './httpRequest';
import httpRequestError from './httpRequestError';

export const policyService = {
  namespaced: true,
  state: {
    policy: {
      type: Object,
      required: true,
      default: {},
    },
    policyDeleted: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  mutations: {
    GET_POLICY(state, policyId) {
      console.log('error GET_STORES');
      httpRequest('api/policy/infos', 'POST', policyId)
        .then(response => {
          console.log(response.data)
          state.policy = response.data;
        })
        .catch(err => {
          console.log('error GET_STORES');
          console.log(err);
          httpRequestError(err, 'api/policies/name');
        });
    },
    UPDATE_POLICY(state, policyData) {
      console.log(policyData);
      httpRequest(
        `api/policy/patch/${policyData.id}`,
        'POST',
        policyData.policy
      )
        .then()
        .catch(err => {
          httpRequestError(err, 'api/policies/patch');
          console.log('error GET_STORES');
          console.log(err);
        });
    },
    APPLY_POLICY(state, choosenPolicyAndDevices) {
      httpRequest('api/policy/apply', 'POST', choosenPolicyAndDevices)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/apply');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    UPDATE_COMPLIANCE(state, compliance) {
      httpRequest(
        `api/policy/${compliance.id}/compliance/update`,
        'POST',
        compliance.compliance
      )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/apply');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    CREATE_COMPLIANCE(state, compliance) {
      httpRequest(
        `api/policy/${compliance.id}/compliance/create`,
        'POST',
        compliance.compliance
      )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/apply');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    DELETE_COMPLIANCE(state, compliance) {
      httpRequest(
        `api/policy/${compliance.id}/compliance/delete`,
        'POST',
        compliance.name
      )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/apply');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    UPDATE_POLICY_PERMISSION(state, data) {
      httpRequest(`api/policy/${data.id}/permission/policy`, 'POST', data.perm)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/apply');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    UPDATE_GRANT_PERMISSION(state, data) {
      httpRequest(`api/policy/${data.id}/permission/grant`, 'POST', data.perm)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/apply');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    SAVE_PASSWORD_REQUIREMENTS(state, passData) {
      httpRequest('api/policy/password', 'POST', passData)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/apply');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    CREATE_POLICY(state, policyName) {
      httpRequest('api/policy', 'POST', policyName)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, 'api/policy');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
    DELETE_POLICY(state, policyName) {
      httpRequest('api/policy/delete', 'POST', policyName)
        .then(response => {
          if (response) {
            state.policyDeleted = 2;
          } else {
            state.policyDeleted = 3;
          }
          state.policyDeleted = 0;
        })
        .catch(err => {
          httpRequestError(err, 'api/policy/delete');
          console.log('CHECK_NAME_EXIST');
          console.log(err);
        });
    },
  },
  getters: {
    get_policy: state => state.policy.policy,
    get_policy_phone: state => state.policy.phone,
    get_policy_network: state => state.policy.network,
    get_policy_system: state => state.policy.system,
    get_policy_apps: state => state.policy.others.applications.value,
    get_policy_others: state => state.policy.others,
  },
  actions: {
    getPolicy({ commit }, policyId) {
      commit('GET_POLICY', policyId);
    },
    updatePolicy({ commit, dispatch }, policyData) {
      commit('UPDATE_POLICY', policyData);
      dispatch('getPolicy', policyData.id);
    },
    savePasswordRequirements({ commit, dispatch }, data) {
      commit('SAVE_PASSWORD_REQUIREMENTS', data);
      dispatch('getPolicy', data.policyId);
    },
    saveGrantPermission({ commit, dispatch }, data) {
      commit('UPDATE_GRANT_PERMISSION', data);
      dispatch('getPolicy', data.id);
    },
    deletePolicy({ commit }, policyName) {
      commit('DELETE_POLICY', policyName);
      commit('GET_POLICIES');
    },
    updatePolicyPermission({ commit, dispatch }, data) {
      commit('UPDATE_POLICY_PERMISSION', data);
      dispatch('getPolicy', data.id);
    },
    createPolicy({ commit }, policyName) {
      commit('CREATE_POLICY', policyName);
      commit('GET_POLICIES');
    },
    updateCompliance({ commit, dispatch }, compliance) {
      commit('UPDATE_COMPLIANCE', compliance);
      dispatch('getPolicy', compliance.id);
    },
    createCompliance({ commit, dispatch }, compliance) {
      commit('CREATE_COMPLIANCE', compliance);
      dispatch('getPolicy', compliance.id);
    },
    deleteCompliance({ commit, dispatch }, compliance) {
      commit('DELETE_COMPLIANCE', compliance);
      dispatch('getPolicy', compliance.id);
    },
    async applyPolicy({ commit }, choosenPolicyAndDevices) {
      commit('APPLY_POLICY', choosenPolicyAndDevices);
    },
  },
};
