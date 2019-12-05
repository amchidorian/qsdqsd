<template lang="html">
  <div>
    <md-button class="md-icon-button md-primary" @click="showDialog = true">
      <md-icon>edit</md-icon>
    </md-button>

    <md-dialog class="" :md-active.sync="showDialog" @md-closed="close()">
      <md-dialog-title class="headerDialogEditDevice"
        >Modification de l'Appareil : {{ device.name }}
      </md-dialog-title>

      <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-chip v-if="error" class="editDeviceWarning">
            <md-icon>warning</md-icon>
            Le device n'a pas été modifié.
          </md-chip>
          <md-field :class="nameError">
            <label>Nom de l'Appareil :</label>
            <md-input v-model="name" @click="cancelError()"></md-input>
            <span class="md-error">Les noms ne correspondent pas.</span>
          </md-field>
          <div class="md-layout-item">
            <md-field>
              <label>Magasin :</label>
              <md-select
                v-model="store"
                name="Magasin"
                id="magasin"
                @click="cancelError()"
              >
                <md-option value="device.magasin.city">Australia</md-option>
                <md-option value="brazil">Brazil</md-option>
                <md-option value="japan">Japan</md-option>
                <md-option :value="device.magasin.city"
                  >United States</md-option
                >
              </md-select>
            </md-field>
            <md-field>
              <label>Restriction :</label>
              <md-select
                v-model="name"
                name="restriction"
                id="restriction"
                @click="cancelError()"
              >
                <md-option value="australia">Australia</md-option>
                <md-option :value="device.policy">Brazil</md-option>
                <md-option value="japan">Japan</md-option>
                <md-option value="united-states">United States</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
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
  name: "DeleteDevice",
  props: {
    device: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
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
      if (
        this.name == this.device.name &&
        this.policy == this.device.policy &&
        this.store == this.device.magasin.city
      ) {
        this.error = true;
        console.log("error");
      } else {
        console.log("success");
      }
    },
    close() {
      this.userInput = "";
      this.error = false;
      this.name = JSON.parse(JSON.stringify(this.device.name));
      this.policy = JSON.parse(JSON.stringify(this.device.policy));
      this.store = JSON.parse(JSON.stringify(this.device.magasin.city));
    },
    cancelError() {
      console.log("cancelError");
      this.errorName = false;
      this.error = false;
    }
  },
  computed: {
    nameError() {
      return {
        "md-invalid": this.errorName
      };
    }
  },
  created: function() {
    this.name = JSON.parse(JSON.stringify(this.device.name));
    this.policy = JSON.parse(JSON.stringify(this.device.policy));
    this.store = JSON.parse(JSON.stringify(this.device.magasin.city));
  }
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
