<template lang="html">
  <div style="height:100%;">
    <md-card md-with-hover style="height:100%;" @click="showDialog = true">
      <md-ripple>
        <md-card-actions style="height: 100%; width:70%; margin-left: 15%;">
          <md-icon class="md-size-2x">add</md-icon><br />
          <span class="md-subhead test" style="margin-left: 10px;"
            >Ajoutes un/plusieurs Appareils</span
          >
        </md-card-actions>
      </md-ripple>
    </md-card>

    <md-dialog class="" :md-active.sync="showDialog" @md-closed="close()">
      <md-dialog-title class="headerDialogEditDevice"
        >Modification de l'Appareil :
      </md-dialog-title>

      <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-90"></div>
      </div>

      <md-dialog-actions>
        <md-button @click="close()">Annuler </md-button>
        <md-button class="md-primary" @click="deleteDevice()">
          <md-icon>edit</md-icon>
          Editer
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "AddDevice",
  props: {},
  data: () => ({
    showDialog: false,
    errorName: false,
    name: null,
    store: null,
    policy: null,
    error: false
  }),
  methods: {
    deleteDevice() {
      console.log("success");
    },
    close() {
      console.log("success");
    },
    cancelError() {
      console.log("success");
    }
  },
  computed: {
    nameError() {
      return {
        "md-invalid": this.errorName
      };
    }
  },
  created: function() {}
};
</script>

<style>
.editDeviceWarning {
  width: 96%;
  background-color: #ff26006b !important;
  margin-left: 2% !important;
  margin-top: 10px;
  margin-bottom: 5px !important;
}

.dialogDeleteDevice {
  width: 30%;
}

.headerDialogEditDevice {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  margin-bottom: 0 !important;
}
</style>
