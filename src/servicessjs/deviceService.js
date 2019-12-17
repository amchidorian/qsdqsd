/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import httpRequest from "./httpRequest";
import httpRequestError from "./httpRequestError";

export const deviceService = {
  namespaced: true,
  state: {
    devices: [],
    token: {
      type: Array,
      required: true,
      default: []
    },
    nameAlreadyExist: {
      type: Number,
      required: true,
      default: 1
    }
  },
  mutations: {
    GET_DEVICES(state) {
      httpRequest("api/devices", "GET")
        .then(response => {
          console.log(response);
          state.devices = response.data;
        })
        .catch(err => {
          httpRequestError(err, "api/devices");
        });
    },
    ENROLL_DEVICE(state, formData) {
      httpRequest("api/device/enroll", "POST", formData)
        .then(response => {
          state.token = response.data;
        })
        .catch(err => {
          httpRequestError(err, "api/device/enroll");
        });
    },
    REMOVE_DEVICE(state, deviceName) {
      httpRequest("api/device/delete", "POST", deviceName)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, "api/device/delete");
        });
    },
    UPDATE_DEVICE(state, deviceData) {
      httpRequest("api/device/update", "POST", deviceData)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, "api/device/update");
        });
    },
    CHECK_DEVICE_NAME(state, deviceName) {
      httpRequest("api/device/name", "GET", null, { name: deviceName })
        .then(response => {
          console.log(response.data);
          state.nameAlreadyExist = response.data;
        })
        .catch(err => {
          httpRequestError(err, "api/device/name");
        });
    },
    UNSET_CHECK_DEVICE_NAME(state) {
      state.nameAlreadyExist = 1;
    }
  },
  getters: {
    get_devices: state => state.devices,
    get_token: state => state.token,
    get_check_device_name: state => state.nameAlreadyExist
  },
  actions: {
    async getDevices({ commit }) {
      commit("GET_DEVICES");
    },
    async removeDevice({ commit }, deviceName) {
      commit("REMOVE_DEVICE", deviceName);
    },
    async updateDevice({ commit }, deviceData) {
      commit("UPDATE_DEVICE", deviceData);
    },
    async enrollDevice({ commit }, formData) {
      commit("ENROLL_DEVICE", formData);
    },
    async checkDeviceName({ commit }, deviceName) {
      commit("CHECK_DEVICE_NAME", deviceName);
    },
    unsetCheckDeviceName({ commit }) {
      commit("UNSET_CHECK_DEVICE_NAME");
    }
  }
};
