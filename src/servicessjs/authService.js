/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import httpRequest from "./httpRequest";
import httpRequestError from "./httpRequestError";

export const authService = {
  namespaced: true,
  state: {
    isLogged: {
      type: Boolean,
      required: true,
      default: false
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  mutations: {
    LOG_USER(state, { userData }) {
      state.isLogged = false;
      httpRequest("auth/login", "POST", userData)
        .then(response => {
          localStorage.setItem("token", response.data.token);
          state.isLogged = true;
        })
        .catch(err => {
          httpRequestError(err, "auth/login");
        });
    },
    CHECK_LOG_USER(state) {
      httpRequest("auth/check", "GET")
        .then(response => {
          console.log("CHECK_LOG_USER response");
          console.log(response.data);
          localStorage.setItem("user", response.data);
          state.isVerified = true;
        })
        .catch(err => {
          httpRequestError(err, "auth/check");
          console.log(err);
        });
    },
    UNAUTHORIZED(state) {
      console.log("UNAUTHORIZED");
      state.isLogged = false;
    },
    IS_LOGGED(state) {
      console.log(httpRequest("auth/islogged", "GET", null));
      console.log(state);
      httpRequest("auth/islogged", "GET", null)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          httpRequestError(err, "auth/islogged");
          console.log(err);
        });
    }
  },
  getters: {
    get_is_logged: state => state.isLogged,
    get_is_verified: state => state.isVerified
  },
  actions: {
    async logUser({ commit }, userData) {
      commit("LOG_USER", { userData });
    },
    async unauthorized({ commit }) {
      commit("UNAUTHORIZED");
    },
    async checkLogUser({ commit }) {
      console.log("checkLogUser");
      commit("CHECK_LOG_USER");
    },
    async isLogged({ commit }) {
      console.log("");
      commit("IS_LOGGED");
    }
  }
};
