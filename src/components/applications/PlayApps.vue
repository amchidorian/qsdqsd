<template>
  <div class="md-layout md-gutter">
    <AddApp :type="'play'" />
    <div
      class="md-layout-item  md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100 columnPolicies"
      v-for="(app, index) in apps"
      :key="index"
    >
      <ApplicationsPlayAppCard :app="app" />
    </div>
  </div>
</template>

<script>
import ApplicationsPlayAppCard from "../cards/ApplicationsPlayAppCard";
import AddApp from "../dialogs/applications/AddApp";
export default {
  name: "PlayApps",
  components: { ApplicationsPlayAppCard, AddApp },
  props: {
    apps: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
