import { authenticationService } from "../_services/authentication.service";

export const requestOptions = {
  get() {
    return {
      method: "GET",
      ...headers()
    };
  },
  post(body) {
    return {
      method: "POST",
      ...headers(),
      body: JSON.stringify(body),
      mode: "cors"
    };
  },
  patch(body) {
    return {
      method: "PATCH",
      ...headers(),
      body: JSON.stringify(body),
      mode: "cors"
    };
  },
  put(body) {
    return {
      method: "PUT",
      ...headers(),
      body: JSON.stringify(body),
      mode: "cors"
    };
  },
  delete() {
    return {
      method: "DELETE",
      ...headers(),
      mode: "cors"
    };
  }
};

export const headers = () => {
  const authHeader = localStorage.getItem("currentUser")
    ? { Authorization: "Bearer " + localStorage.getItem("currentUser") }
    : {};

  return {
    headers: {
      ...authHeader,
      "Content-Type": "application/json"
    }
  };
}