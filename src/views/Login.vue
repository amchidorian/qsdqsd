<template>
  <div>
    <div
      class="md-layout md-gutter"
      style="padding-top:50px;"
    >
      <div
        class="md-layout-item md-size-25 md-medium-size-20 md-small-size-10 md-xsmall-size-5"
      />
      <div
        class="md-layout-item md-size-50 md-medium-size-60 md-small-size-80 md-xsmall-size-90"
      >
        <form @submit.prevent="onSubmit">
          <md-field>
            <label>Identifiant</label>
            <md-input v-model="username" />
          </md-field>
          <md-field>
            <label>Mot de Passe</label>
            <md-input
              v-model="password"
              type="password"
            />
          </md-field>
          <md-button @click="connect()">
            Connexion
          </md-button>
          <div
            v-if="error"
            class="alert alert-danger"
          >
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import { router } from "../_helpers/router";
import { authenticationService } from "../_services/authentication.service";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: ""
    };
  },
  validations: {
    username: { required },
    password: { required }
  },
  created() {
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      return router.push("/");
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    connect() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      authenticationService
        .login(this.username, this.password)
        .then(res => {
          localStorage.setItem("currentUser", res.token);
          localStorage.setItem("type", JSON.stringify(res.type));
          if (res.type == "admin") {
            router.push("/admin");
          } else if (res.type == "user") {
            router.push("/");
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
.loginCol {
  margin-top: 200px;
}
</style>
