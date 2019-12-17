/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import axios from "axios";
// import store from "../mainStore.js";

const addArgToUrl = function(url, arg) {
  let finalUrl = url;
  for (const key in arg) {
    finalUrl += `&${key}=${arg[key]}`;
  }
  return finalUrl;
};

export default function(url, method, data, argument) {
  let fullUrl = `http://localhost:8000/${url}?token=${localStorage.getItem(
    "token"
  )}`;
  if (argument != null) {
    fullUrl = addArgToUrl(fullUrl, argument);
  }
  if (method === "GET") {
    return axios.get(fullUrl);
  }
  if (method === "POST") {
    return axios.post(fullUrl, JSON.stringify(data));
  }
  if (method === "DELETE") {
    fullUrl += "?_method=PATCH";
    return axios.delete(fullUrl, { data: JSON.stringify(data) });
  }
}
