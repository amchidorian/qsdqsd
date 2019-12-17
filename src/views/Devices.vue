<template>
  <div>
    <div
      class="md-layout md-gutter"
      style="margin-left:20px; margin-right:20px; "
    >
      <div
        class="md-layout-item  md-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-100"
      >
        <md-field>
          <label>Recherche par Magasin</label>
          <md-input v-model="searchByMagValue" @input="search('mag')" />
        </md-field>
      </div>

      <div
        class="md-layout-item  md-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-100"
      >
        <md-field>
          <label>Recherche par Restriction</label>
          <md-input v-model="searchByPolValue" @input="search('pol')" />
        </md-field>
      </div>
    </div>

    <div>
      <div class="md-layout md-gutter">
        <div
          style="margin-bottom: 20px;"
          class="md-layout-item  md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <AddDevice
            style="height:100%; !important; width:100%; !important"
            :type="'notempty'"
          />
        </div>
        <div
          v-for="(device, index) in devices"
          :key="index"
          class="md-layout-item  md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100 columnDevices"
        >
          <DevicesDeviceCard v-if="device.show" :device="device" />
        </div>
      </div>
    </div>
    <md-empty-state
      v-if="devices.length == 0"
      md-icon="devices_other"
      md-label="Aucun Appareils n'a été enregistré."
      md-description="En les enregistrant, vous pourrez les assignants à un groupe permettant de restreindre l'utilisation de ceux-ci."
    >
      <AddDevice :type="'empty'" />
    </md-empty-state>
  </div>
</template>

<script>
import { devicesService } from "../_services/devices.service";
import DevicesDeviceCard from "../components/cards/DevicesDeviceCard";
import AddDevice from "../components/dialogs/device/AddDevice";
export default {
  name: "Devices",
  components: { DevicesDeviceCard, AddDevice },
  data() {
    return {
      selectedDevice: undefined,
      openAddDeviceModel: false,
      openApplyPolicyModel: false,
      openUpdateDeviceModel: false,
      openDeleteDeviceModel: false,
      editRestri: false,
      devices: [],
      deviceToDelete: "",
      active: "Home",
      searchByPolValue: "",
      searchByMagValue: "",
      updatingDevice: {}
    };
  },
  computed: {},
  watch: {
    searchByPolValue() {
      this.$emit("updateRestri", [this.policyOption, this.inputVal, this.tab]);
    },
    searchByMagValue() {
      this.$emit("updateRestri", [this.policyOption, this.inputVal, this.tab]);
    }
  },
  beforeCreate() {
    devicesService.getDevices().then(res => {
      this.devices = res;
    });
  },
  methods: {
    closeModal: function() {
      this.openAddDeviceModel = false;
      this.openApplyPolicyModel = false;
      this.openDeleteDeviceModel = false;
      this.openUpdateDeviceModel = false;
    },
    toggleApplyPolicy() {
      if (this.openApplyPolicyModel) {
        this.openApplyPolicyModel = false;
      }
      this.openApplyPolicyModel = !this.openApplyPolicyModel;
    },
    toggleAddDevice() {
      if (this.openAddDeviceModel) {
        this.openAddDeviceModel = false;
      }
      this.openAddDeviceModel = !this.openAddDeviceModel;
    },
    toggleUpdateDevice(index) {
      this.updatingDevice = this.devices[index];
      if (this.openUpdateDeviceModel) {
        this.openUpdateDeviceModel = false;
      }
      this.openUpdateDeviceModel = !this.openUpdateDeviceModel;
    },
    toggleDeleteDevice(deviceName) {
      if (this.openDeleteDeviceModel) {
        this.openDeleteDeviceModel = false;
      } else {
        this.deviceToDelete = deviceName;
        this.openDeleteDeviceModel = !this.openDeleteDeviceModel;
      }
    },
    search() {
      for (const i in this.devices) {
        const data = this.devices[i];
        if (
          this.doesStartWith(this.searchByMagValue, data.magasin.city) &&
          this.doesStartWith(this.searchByPolValue, data.policy)
        ) {
          data.show = true;
        } else {
          data.show = false;
        }
      }
    },
    doesStartWith(start, value) {
      if (
        (value.charAt(0).toLowerCase() + value.slice(1)).startsWith(
          start.charAt(0).toLowerCase() + start.slice(1)
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    updateDevices() {
      devicesService.getDevices().then(res => {
        this.devices = res;
      });
    }
  }
};
</script>

<style>
.deviceDetails {
  text-align: left;
  margin-left: 20px;
}
.columnDevices {
  margin-bottom: 20px;
}
.detailsData {
  text-align: left;
}
.detailsTitle {
  margin-top: 5px;
}
.test {
  width: auto;
}

.custom-block.warning {
  background-color: rgba(255, 229, 100, 0.3);
  border-color: #e7c000;
  color: #6b5900;
}
</style>
