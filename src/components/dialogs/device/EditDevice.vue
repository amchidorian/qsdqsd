<template lang="html">
  <div>
    <md-button class="md-icon-button md-primary" @click="showDialog = true">
      <md-icon>edit</md-icon>
    </md-button>

    <md-dialog class="" :md-active.sync="showDialog" @md-closed="close()">
      <md-dialog-title class="headerDialogEditDevice">
        Modification de l'Appareil : {{ device.name }}
      </md-dialog-title>
      <div class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-chip v-if="error" class="editDeviceWarning">
            <md-icon>warning</md-icon>
            Le device n'a pas été modifié.
          </md-chip>
          <md-field>
            <label>Nom de l'Appareil :</label>
            <md-input
              v-model="name"
              :placeholder="device.name"
              @click="cancelError()"
            />
            <span class="md-error">Les noms ne correspondent pas.</span>
          </md-field>
          <div class="md-layout-item">
            <md-field>
              <label>Magasin :</label>
              <md-select
                id="magasin"
                v-model="store"
                :placeholder="device.magasin.city"
                name="Magasin"
                @click="cancelError()"
              >
                <md-option
                  :value="item.value"
                  v-for="(item, index) in stores"
                  v-bind:key="index"
                >
                  {{ item.text }}
                </md-option>
              </md-select>
            </md-field>
            <md-field>
              <label>Groupe :</label>
              <md-select
                id="restriction"
                :placeholder="device.policy"
                v-model="groupe"
                name="restriction"
                @click="cancelError()"
              >
                <md-option
                  :value="item.name"
                  v-for="(item, index) in groupes"
                  v-bind:key="index"
                >
                  {{ item.name }}
                </md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </div>

      <md-dialog-actions>
        <md-button @click="close()">
          Annuler
        </md-button>
        <md-button class="md-primary" @click="updateDevice()">
          Valider
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { storesService } from "../../../_services/stores.service";
import { devicesService } from "../../../_services/devices.service";
import { groupesService } from "../../../_services/groupes.service";
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
    name: null,
    store: null,
    groupe: null,
    stores: [],
    groupes: [],
    error: false
  }),
  computed: {},
  created: function() {
    storesService.getStores().then(res => {
      this.stores = [];
      console.log(res);
      for (const i in res) {
        const mag = {
          key: res[i].id,
          text: res[i].city,
          value: res[i]
        };
        this.stores.push(mag);
      }
    });
    groupesService.getGroupes().then(res => {
      this.groupes = res;
    });
  },
  methods: {
    updateDevice() {
      var updatedDevice = {};
      if (this.name == null && this.groupe == null && this.store == null) {
        this.error = true;
      } else {
        updatedDevice.id = this.device.id;
        if (this.name != null) {
          updatedDevice.name = this.name;
        }
        if (this.groupe != null) {
          updatedDevice.groupe = this.groupe;
        }
        if (this.store != null) {
          updatedDevice.store = this.store;
        }
        devicesService
          .updateDevice(updatedDevice)
          .then(res => console.log(res));
      }
    },
    close() {
      this.userInput = "";
      this.error = false;
    },
    cancelError() {
      this.errorName = false;
      this.error = false;
    }
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
