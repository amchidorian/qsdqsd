import { requestOptions } from "../_helpers/request-options";
import { handleResponse } from "../_helpers/handle-response";

export const storesService = {
  getStores
};

function getStores() {
  return fetch(`http://localhost:8000/api/stores`, requestOptions.get()).then(
    handleResponse
  );
}

function savePlayStoreApp(source) {
  return fetch(
    `http://localhost:8000/api/apps/play`,
    requestOptions.post(source)
  ).then(handleResponse);
}

function deleteApplication(app) {
  return fetch(
    `http://localhost:8000/api/apps/delete`,
    requestOptions.post(app)
  ).then(handleResponse);
}
