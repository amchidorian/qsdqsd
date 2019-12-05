/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import store from "../mainStore.js";

export default function(err, uri) {
  console.log(uri);
  if (err.response.status === 401) {
    store.dispatch("authService/unauthorized");
  }
  if (err.response.status === 404) {
    console.log("err");
    console.log(err.response.data);
  }
}
