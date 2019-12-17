import { requestOptions } from "../_helpers/request-options";
import { handleResponse } from "../_helpers/handle-response";

export const groupeService = {
  getGroupe,
  createGroupe,
  deleteGroupe,
  updateCompliance,
  createCompliance,
  deleteCompliance,
  savePasswordRequirements,
  updatePolicyPermission,
  saveGrantPermission,
  updateGroupe
};

function getGroupe(id) {
  return fetch(
    `http://localhost:8000/api/policy/infos`,
    requestOptions.post(id)
  ).then(handleResponse);
}

function updateGroupe(policy) {
  return fetch(
    `http://localhost:8000/api/policy/patch/${policy.id}`,
    requestOptions.post(policy.data)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function createGroupe(policyName) {
  return fetch(
    `http://localhost:8000/api/policy`,
    requestOptions.post(policyName)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function deleteGroupe(policyName) {
  return fetch(
    `http://localhost:8000/api/policy/delete`,
    requestOptions.post(policyName)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function deleteCompliance(compliance) {
  return fetch(
    `http://localhost:8000/api/policy/${compliance.id}/compliance/delete`,
    requestOptions.post(compliance.name)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function updateCompliance(compliance) {
  return fetch(
    `http://localhost:8000/api/policy/${compliance.id}/compliance/update`,
    requestOptions.post(compliance.compliance)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function createCompliance(compliance) {
  return fetch(
    `http://localhost:8000/api/policy/${compliance.id}/compliance/create`,
    requestOptions.post(compliance.compliance)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function savePasswordRequirements(passRequirementsData) {
  return fetch(
    `http://localhost:8000/api/policy/password`,
    requestOptions.post(passRequirementsData)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function updatePolicyPermission(permData) {
  return fetch(
    `http://localhost:8000/api/policy/${permData.id}/permission/policy`,
    requestOptions.post(permData.perm)
  )
    .then(handleResponse)
    .catch(handleResponse);
}

function saveGrantPermission(grantPermData) {
  return fetch(
    `http://localhost:8000/api/policy/${grantPermData.id}/permission/grant`,
    requestOptions.post(grantPermData.perm)
  )
    .then(handleResponse)
    .catch(handleResponse);
}
