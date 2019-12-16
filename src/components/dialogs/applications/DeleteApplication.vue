<template lang="html">
  <div>
    <md-button class="md-icon-button md-accent" @click="showDialog = true">
      <md-icon>delete</md-icon>
    </md-button>

    <md-dialog
      class="dialogDeletePolicy"
      :md-active.sync="showDialog"
      @md-closed="close()"
    >
      <md-dialog-title
        >Suppression de l'application : {{ app.name }}</md-dialog-title
      >
      <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <p class="md-subheading">
            Afin de confirmer la suppression de l'Application', merci de
            renseigner son nom :
          </p>
          <p class="md-subheading" style="color:orange;">
            Supprimer l'Application la désinstallera de tous les appareils.
          </p>
          <md-field :class="messageClass" @click="error = false">
            <label>Nom de l'Application :</label>
            <md-input v-model="userInput"></md-input>
            <span class="md-error">Les noms ne correspondent pas.</span>
          </md-field>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="close()">Annuler </md-button>
        <md-button class="md-accent" @click="deleteApplication()">
          <md-icon>delete</md-icon>
          Supprimer
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { applicationsService } from "../../../_services/applications.service";
export default {
  name: "DeleteApplication",
  props: {
    app: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data: () => ({
    userInput: "",
    refreshApps: false,
    showDialog: false,
    error: false
  }),
  watch: {
    refreshApps() {
      if (this.refreshApps) {
        document.getElementById("refreshAppsBtn").click();
      }
    }
  },
  methods: {
    deleteApplication() {
      if (this.userInput != this.app.name) {
        this.error = true;
      } else {
        applicationsService.deleteApplication(this.app).then(res => {
          this.refreshApps = true;
          this.showDialog = false;
        });
      }
    },
    close() {
      this.userInput = "";
      this.error = false;
    }
  },
  computed: {
    messageClass() {
      return {
        "md-invalid": this.error
      };
    }
  }
};
</script>

<style>
.deleteDeviceWarning {
  background-color: #ffa5006b !important;
  margin-left: 2% !important;
  margin-top: -10px;
  margin-bottom: 5px !important;
}

.dialogDeleteDevice {
}

.headerDialogDeleteDevice {
  border: solid !important;
  border-width: 0 0 1px 0 !important;
  background-color: #d40f0f40 !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>
