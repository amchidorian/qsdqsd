import { requestOptions } from "../_helpers/request-options";
import { handleResponse } from "../_helpers/handle-response";

export const devicesService = {
  getDevices,
  enrollDevices
};

function getDevices() {
  return fetch(`http://localhost:8000/api/devices`, requestOptions.get()).then(
    handleResponse
  );
}

function enrollDevices(enrollData) {
  return fetch(
    `http://localhost:8000/api/device/enroll`,
    requestOptions.post(enrollData)
  ).then(handleResponse);
}
