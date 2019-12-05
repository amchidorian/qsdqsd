<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-25"></div>
      <div class="md-layout-item md-size-50">
        <md-field>
          <label>Identifiant</label>
          <md-input v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Mot de Passe</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-button @click="connect()">Connexion</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      missingField: false,
      dataError: false
    };
  },
  methods: {
    connect: function() {
      if (this.password != "" && this.email != "") {
        this.$store.dispatch("authService/logUser", {
          email: this.email,
          password: this.password
        });
      } else {
        this.missingField = true;
      }
    },

    untoggleError: function() {
      this.missingField = false;
      this.dataError = false;
    }
  }
};
</script>

<style>
.loginCol {
  margin-top: 200px;
}
</style>
