<template>
  <div>
    <md-list-item v-if="!policyOption.value">
      <md-tooltip
        v-if="displayInfosSup"
        md-direction="left"
      >
        {{
          policyOption.infoSup
        }}
      </md-tooltip>
      <md-icon
        v-if="!policyOption.updated"
        class="unlockIcon"
      >
        lock_open
      </md-icon>
      <md-icon
        v-else
        class="updateUnlockIcon"
      >
        lock_open
      </md-icon>
      <span class="md-list-item-text lockLabel">{{ policyOption.fr }}</span>
    </md-list-item>
    <md-list-item v-else>
      <md-tooltip
        v-if="displayInfosSup"
        md-direction="left"
      >
        {{
          policyOption.infoSup
        }}
      </md-tooltip>
      <md-icon
        v-if="!policyOption.updated"
        class="lockIcon"
      >
        lock
      </md-icon>
      <md-icon
        v-else
        class="updateLockIcon"
      >
        lock
      </md-icon>
      <span class="md-list-item-text lockLabel">{{ policyOption.fr }}</span>
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
  margin-left: 20px !important;
}

.updateUnlockIcon {
  margin-left: 20px !important;
  color: rgb(82, 82, 179) !important;
}

.updateLockIcon {
  margin-left: 20px !important;
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
