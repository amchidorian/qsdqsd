<template lang="html">
  <div>
    <md-card v-if="type == 'notempty'" md-with-hover style="height:100%;">
      <md-ripple>
        <div style="height:100%;" @click="showDialog = true">
          <md-card-actions style="height: 100%; width:70%; margin-left: 15%;">
            <md-icon class="md-size-2x"> add </md-icon><br />
            <span class="md-subhead test" style="margin-left: 10px;"
              >Ajouter un Appareil</span
            >
          </md-card-actions>
        </div>
      </md-ripple>
    </md-card>
    <md-button
      v-if="type == 'empty'"
      class="md-primary md-raised"
      @click="showDialog = true"
    >
      Ajouter un Appareil
    </md-button>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Ajout d'un ou plusieurs appareils</md-dialog-title>
      <div style="overflow: scroll;">
        <md-card
          v-if="step === 'selection'"
          md-dynamic-height
          style="width:90%; margin-left:5%;"
        >
          <md-card-header>
            <div class="md-title">
              Affecter à un magasin
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div
                v-for="(store, index) in stores"
                :key="index"
                class="md-layout-item  md-size-25 md-medium-size-50 md-small-size-50 md-xsmall-size-100"
              >
                <md-card style="margin-bottom:10px;">
                  <div
                    :class="{
                      selectedItem: enrolmentData.store === store ? true : false
                    }"
                    style="width:100%; height:100%;"
                    @click="enrolmentData.store = store"
                  >
                    <md-card-content>
                      {{ store.text }}
                    </md-card-content>
                  </div>
                </md-card>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <md-card
          v-if="step === 'selection'"
          md-dynamic-height
          style="width:90%; margin-left:5%;"
        >
          <md-card-header>
            <div class="md-title">
              Affecter à une Restriction
            </div>
          </md-card-header>

          <md-card-content v-if="step === 'qrcode'" />
          <md-card-content>
            <div class="md-layout md-gutter">
              <div
                v-for="(policy, index) in policies"
                :key="index"
                class="md-layout-item  md-size-25 md-medium-size-50 md-small-size-50 md-xsmall-size-100"
              >
                <md-card
                  style="margin-bottom:10px;"
                  :class="{
                    selectedItem: enrolmentData.policy === policy ? true : false
                  }"
                >
                  <div
                    :class="{
                      selectedItem:
                        enrolmentData.policy === policy ? true : false
                    }"
                    style="width:100%; height:100%;"
                    @click="enrolmentData.policy = policy"
                  >
                    <md-card-content>
                      {{ policy.name }}
                    </md-card-content>
                  </div>
                </md-card>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <md-card
          v-if="step === 'qrcode'"
          md-dynamic-height
          style="width:90%; margin-left:5%;"
        >
          <md-card-header>
            <span class="md-subheading">
              Afin d'ajouter un appareil mobile au gestionnaire, il faut que
              celui ci soit neuf, ou réinitialisé au valeurs d'usine.
              <br />Une fois celui ci réinitialisé :</span
            >
            <p class="md-caption" style="text-align:center!important">
              Configurer l'Appareil jusqu'au renseignement du compte GMAIL
            </p>
            <p class="md-caption" style="text-align:center!important">
              Entrer "afw#setup" à la place de l'adresse mail
            </p>
            <p class="md-subheading" style="text-align:center!important">
              Enfin renseigner le code : <br /><span style="color:blue"
                >{{ enrolmentCode }} </span
              ><br />
              où scanner le QrCode
            </p>
          </md-card-header>

          <md-card-content style="min-width:500px!important">
            <qrcode
              style="
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    display: block;"
              class="qrCodePrint"
              :value="enrolmentToken"
              :options="{ width: 500 }"
            />
          </md-card-content>
        </md-card>
      </div>
      <md-dialog-actions>
        <md-button
          v-if="step === 'selection'"
          class="md-primary"
          @click="cancelAdd()"
        >
          Annuler
        </md-button>
        <md-button
          v-if="step === 'selection'"
          class="md-primary"
          :disabled="
            enrolmentData.policy === null || enrolmentData.store === null
          "
          @click="generateQRCode()"
        >
          Suivant
        </md-button>
        <md-button
          v-if="step === 'qrcode'"
          class="md-primary"
          :disabled="
            enrolmentData.policy === null || enrolmentData.store === null
          "
          @click="closeModal()"
        >
          Terminer
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
  name: "AddDevice",
  props: {
    type: String
  },
  data: () => ({
    enrolmentCode: "",
    enrolmentData: {
      store: null,
      policy: null
    },
    step: "selection",
    showDialog: false,
    stores: [],
    policies: [],
    checkDeviceName: "",
    enrolmentToken: {}
  }),
  computed: {
    nameError() {
      return {
        "md-invalid": this.errorName
      };
    }
  },
  watch: {
    enrolmentToken() {
      this.enrolmentCode = JSON.parse(this.enrolmentToken)[
        "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE"
      ]["com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN"];
    }
  },
  beforeCreate() {
    storesService.getStores().then(res => {
      this.stores = [];
      for (const i in res) {
        const mag = {
          key: res[i].id,
          text: res[i].city,
          value: res[i].id
        };
        this.stores.push(mag);
      }
    });
    groupesService.getGroupes().then(res => {
      this.policies = res;
    });
  },
  created: function() {},
  methods: {
    generateQRCode() {
      devicesService.enrollDevices(this.enrolmentData).then(res => {
        this.enrolmentToken = res;
        this.step = "qrcode";
      });
    },
    getStores() {
      storesService.getStores().then(res => {
        this.stores = [];
        for (const i in res) {
          const mag = {
            key: res[i].id,
            text: res[i].city,
            value: res[i].id
          };
          this.stores.push(mag);
        }
      });
    },
    closeModal() {
      this.showDialog = false;
      this.enrolmentCode = "";
      this.enrolmentData = {
        store: null,
        policy: null
      };
      this.step = "selection";
    },
    getGroupes() {
      groupesService.getGroupes().then(res => {
        this.policies = res;
      });
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
.selectedItem {
  background-color: rgb(255, 247, 232);
}
</style>
