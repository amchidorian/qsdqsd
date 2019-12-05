<template lang="html">
  <div>
    <md-button class="md-icon-button md-accent" @click="showDialog = true">
      <md-icon>delete</md-icon>
    </md-button>

    <md-dialog class="" :md-active.sync="showDialog" @md-closed="close()">
      <md-dialog-title class="headerDialogDeleteDevice"
        >Suppression de l'Appareil : {{ device.name }}</md-dialog-title
      >

      <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-chip class="deleteDeviceWarning">
            <md-icon>warning</md-icon>
            Supprimer un appareil le réinitialisera.
          </md-chip>
          <span class="md-subheading"
            >Afin de confirmer la Suppression de l'Appareil, merci de renseigner
            son nom :
          </span>
          <md-field :class="messageClass" @click="error = false">
            <label>Nom de l'Appareil</label>
            <md-input v-model="userInput"></md-input>
            <span class="md-error">Les noms ne correspondent pas.</span>
          </md-field>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="close()">Annuler </md-button>
        <md-button class="md-accent" @click="deleteDevice()">
          <md-icon>delete</md-icon>
          Supprimer
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteDevice",
  props: {
    device: {
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
    deleteDevice() {
      if (this.userInput != this.device.name) {
        this.error = true;
        console.log("error");
      } else {
        console.log("success");
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
  width: 96%;
  background-color: #ffa5006b !important;
  margin-left: 2% !important;
  margin-top: -10px;
  margin-bottom: 5px !important;
}

.dialogDeleteDevice {
  width: 30%;
}

.headerDialogDeleteDevice {
  border: solid !important;
  border-width: 0 0 1px 0 !important;
  background-color: #d40f0f40 !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>
