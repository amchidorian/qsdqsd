<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{ device.name }}</div>
      <div class="md-subhead">Last sync. {{ device.lastPolicySync }}</div>
    </md-card-header>

    <md-card-content
      ><md-list class="md-dense">
        <md-list-item>
          <md-icon>store</md-icon>
          <span class="md-list-item-text">{{ device.magasin.city }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>lock</md-icon>
          <span class="md-list-item-text">{{ device.policy }}</span>
        </md-list-item>

        <md-list-item>
          <md-icon>fingerprint</md-icon>
          <span class="md-list-item-text">{{ device.serie }}</span>
        </md-list-item>
      </md-list>
    </md-card-content>
    <md-card-actions>
      <DeleteDevice :device="device" />
      <EditDevice :device="device" />
    </md-card-actions>
  </md-card>
</template>

<script>
import DeleteDevice from "../dialogs/device/DeleteDevice";
import EditDevice from "../dialogs/device/EditDevice";

export default {
  name: "DevicesDeviceCard",
  components: { DeleteDevice, EditDevice },
  props: {
    device: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
};
</script>

<style>
.deviceDetails {
  text-align: left;
  margin-left: 20px;
}
.detailsData {
  text-align: left;
}
.detailsTitle {
  margin-top: 5px;
}
</style>
