<template lang="html">
  <div>
    <md-card md-with-hover style="height:100%;" v-if="type == 'notempty'">
      <md-ripple>
        <div style="height:100%;" @click="showDialog = true">
          <md-card-actions style="height: 100%; width:70%; margin-left: 15%;">
            <md-icon class="md-size-2x">add</md-icon><br />
            <span class="md-subhead test" style="margin-left: 10px;"
              >Créer une nouvelle Restriction</span
            >
          </md-card-actions>
        </div>
      </md-ripple>
    </md-card>

    <md-button
      class="md-primary md-raised"
      v-if="type == 'empty'"
      @click="showDialog = true"
      >Ajouter un Groupe</md-button
    >
    <md-dialog
      class="dialogAddPolicy"
      :md-active.sync="showDialog"
      @md-closed="close()"
    >
      <md-dialog-title>Création d'une nouvelle restriction</md-dialog-title>

      <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-field :class="messageClass" @click="error = false">
            <label>Nom de la nouvelle restriction :</label>
            <md-input v-model="userInput"></md-input>
            <span class="md-error"
              >La restriction "{{ userInput }}" existe deja.</span
            >
          </md-field>
          <!-- <md-progress-spinner
            :md-diameter="20"
            :md-stroke="3"
            md-mode="indeterminate"
          ></md-progress-spinner>
          <span class="md-caption" style="margin-left:20px; line-height:100%;"
            >Vérification du nom.</span
          > -->
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="validateCreate()">
          Créer
        </md-button>
        <md-button class="md-primary" @click="close()">Annuler </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { groupeService } from "../../../_services/groupe.service";
export default {
  name: "AddPolicy",
  props: {
    type: String
  },
  data: () => ({
    userInput: "",
    showDialog: false,
    error: false
  }),
  methods: {
    close() {
      this.userInput = "";
      this.error = false;
      this.showDialog = false;
    },
    validateCreate() {
      groupeService.createGroupe(this.userInput).then(res => {
        document.getElementById("refreshGroupesBtn").click();
        this.close();
      });
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
