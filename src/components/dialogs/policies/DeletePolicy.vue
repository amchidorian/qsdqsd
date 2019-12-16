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
      <md-dialog-title class="headerDialogDeleteDevice"
        >Suppression de la restriction : {{ policy.name }}</md-dialog-title
      >

      <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-chip class="deleteDeviceWarning">
            <md-icon>warning</md-icon>
            Supprimer la restriction réinitialisera tous les appareils
            associés.</md-chip
          >
          <p class="md-subheading">
            Afin de confirmer la suppression de la Restriction, merci de
            renseigner son nom :
          </p>
          <md-field :class="messageClass" @click="error = false">
            <label>Nom de la restriction :</label>
            <md-input v-model="userInput"></md-input>
            <span class="md-error">Les noms ne correspondent pas.</span>
          </md-field>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-accent" @click="deletePolicy()">
          <md-icon>delete</md-icon>
          Supprimer
        </md-button>
        <md-button class="md-primary" @click="close()">Annuler </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { groupeService } from "../../../_services/groupe.service";
export default {
  name: "DeletePolicy",
  props: {
    policy: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data: () => ({
    userInput: "",
    showDialog: false,
    error: false
  }),
  methods: {
    deletePolicy() {
      if (this.userInput != this.policy.name) {
        this.error = true;
      } else {
        groupeService.deleteGroupe(this.policy.name).then(res => {
          document.getElementById("refreshGroupesBtn").click();
          this.close();
        });
      }
    },
    close() {
      this.userInput = "";
      this.error = false;
      this.showDialog = false;
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
