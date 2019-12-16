import { BehaviorSubject } from "rxjs";
import axios from "axios";

import { requestOptions } from "../_helpers/request-options";
import { handleResponse } from "../_helpers/handle-response";

export const authenticationService = {
  login,
  logout
};

function login(username, password) {
  return fetch(
    `http://localhost:8000/auth/login`,
    requestOptions.post({
      email: username,
      password: password
    })
  ).then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
}
