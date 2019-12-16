<template>
  <div class="md-layout md-gutter">
    <md-empty-state
      md-icon="apps"
      md-label="Aucune Application du PlayStore n'a été enregistré."
      md-description="En les enregistrant, vous pourrez les assignants à un groupe permettant de les installer automatiquement sur les appareils associés."
      v-if="apps.length == 0"
    >
      <AddApp style="height: 100%;" :empty="true" :type="'play'" />
    </md-empty-state>
    <div
      class="md-layout md-gutter md-layout-item md-size-100 "
      v-if="apps.length > 0"
    >
      <AddApp
        :type="'play'"
        :empty="false"
        md-dynamic-height
        style="margin-bottom: 20px;"
        class="md-layout-item md-size-20 md-medium-size-20 md-small-size-50 md-xsmall-size-100"
      />
      <div
        class="md-layout-item md-size-20 md-medium-size-20 md-small-size-50 md-xsmall-size-100"
        v-for="(app, index) in apps"
        :key="index"
      >
        <ApplicationsPlayAppCard :app="app" />
      </div>
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
