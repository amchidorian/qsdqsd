<template>
  <div class="md-layout md-gutter">
    <AddApp :type="'web'" />
    <div
      class="md-layout-item  md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100 columnPolicies"
      v-for="(app, index) in apps"
      :key="index"
    >
      <ApplicationsWebAppCard :app="app" />
    </div>
  </div>
</template>

<script>
import ApplicationsWebAppCard from "../cards/ApplicationsWebAppCard";
import AddApp from "../dialogs/applications/AddApp";
export default {
  name: "WebApps",
  components: { ApplicationsWebAppCard, AddApp },
  props: {
    apps: Array
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
