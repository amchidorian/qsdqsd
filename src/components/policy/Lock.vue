<template>
  <div>
    <md-list-item v-if="!policyOption.value">
      <md-tooltip v-if="displayInfosSup" md-direction="right">{{
        policyOption.infoSup
      }}</md-tooltip>
      <md-icon class="unlockIcon" v-if="!policyOption.updated"
        >lock_open</md-icon
      >
      <md-icon class="updateUnlockIcon" v-else>lock_open</md-icon>
      <span class="md-list-item-text lockLabel">{{ policyOption.fr }}</span>
    </md-list-item>
    <md-list-item v-else>
      <md-tooltip v-if="displayInfosSup" md-direction="left">{{
        policyOption.infoSup
      }}</md-tooltip>
      <span class="md-list-item-text unlockLabel">{{ policyOption.fr }}</span>
      <md-icon class="lockIcon" v-if="!policyOption.updated">lock</md-icon>
      <md-icon class="updateLockIcon" v-else>lock</md-icon>
    </md-list-item>
  </div>
</template>

<script>
export default {
  name: "Lock",
  components: {},
  props: {
    policyOption: {
      type: Object,
      required: true,
      default: function() {
        return {
          infoSup: ""
        };
      }
    },
    displayInfosSup: {
      type: Boolean
    },
    updatable: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style>
.unlockIcon {
  margin-left: 20px !important;
  color: green !important;
}

.lockIcon {
  margin-right: 20px !important;
}

.updateUnlockIcon {
  margin-left: 20px !important;
  color: rgb(82, 82, 179) !important;
}

.updateLockIcon {
  margin-right: 20px !important;
  color: rgb(82, 82, 179) !important;
}

.unlockLabel {
  width: 100%;
  text-align: right !important;
  display: block !important;
}
.lockLabel {
  width: 100%;
  text-align: left !important;
  display: block !important;
}
</style>
