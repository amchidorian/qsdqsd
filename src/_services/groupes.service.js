import { requestOptions } from "../_helpers/request-options";
import { handleResponse } from "../_helpers/handle-response";

export const groupesService = {
  getGroupes
};

function getGroupes() {
  return fetch(`http://localhost:8000/api/policies`, requestOptions.get()).then(
    handleResponse
  );
}
