<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-25">
        <md-field>
          <label for="vertical">Recherche par Restriction</label>
          <md-select>
            <md-option value="top">Top</md-option>
            <md-option value="center">Center</md-option>
            <md-option value="bottom">Bottom</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item md-size-25">
        <md-field>
          <label for="horizontal">Recherche par Store</label>
          <md-select>
            <md-option value="left">Left</md-option>
            <md-option value="center">Center</md-option>
            <md-option value="right">Right</md-option>
            <md-option value="space-around">Space Around</md-option>
            <md-option value="space-between">Space Between</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <div class="example">
      <div class="md-layout md-gutter">
        <div
          class="md-layout-item  md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100"
          style="margin-bottom: 20px;"
        >
          <AddDevice style="height: 100%;" />
        </div>
        <div
          class="md-layout-item  md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100 columnDevices"
          v-for="(device, index) in devices"
          :key="index"
        >
          <DevicesDeviceCard :device="device" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DevicesDeviceCard from "../components/cards/DevicesDeviceCard";
import AddDevice from "../components/dialogs/device/AddDevice";
export default {
  name: "Devices",
  components: { DevicesDeviceCard, AddDevice },
  data() {
    return {
      devices: [
        {
          name: "test2",
          magasin: { city: "nimes" },
          policy: "test",
          serie: "2",
          version: "2",
          lastPolicySync: "2"
        },
        {
          name: "test1",
          magasin: { city: "nimes" },
          policy: "test",
          serie: "1",
          version: "2",
          lastPolicySync: "3"
        },
        {
          name: "test",
          magasin: { city: "nimes" },
          policy: "test",
          serie: "1",
          version: "2",
          lastPolicySync: "3"
        },
        {
          name: "test",
          magasin: { city: "nimes" },
          policy: "test",
          serie: "1",
          version: "2",
          lastPolicySync: "3"
        }
      ],
      select1: 3,
      options1: [
        { text: "IT", value: 0 },
        { text: "Blade Runner", value: 2 },
        { text: "Thor Ragnarok", value: 3 }
      ],
      value1: "qsdsqd",
      value2: "",
      popupActivo2: false,
      popupActivo3: false
    };
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
