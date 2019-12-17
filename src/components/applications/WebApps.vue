<template>
  <div class="md-layout md-gutter">
    <md-empty-state
      v-if="apps.length == 0"
      md-icon="apps"
      md-label="Aucune Application Web n'a été enregistré."
      md-description="En les enregistrant, vous pourrez les assignants à un groupe permettant de les installer automatiquement sur les appareils associés."
    >
      <AddApp
        style="height: 100%;"
        :empty="true"
        :type="'web'"
      />
    </md-empty-state>
    <div
      v-if="apps.length > 0"
      class="md-layout md-gutter md-layout-item md-size-100 "
    >
      <AddApp
        md-dynamic-height
        style="margin-bottom: 20px;"
        class="md-layout-item md-size-20 md-medium-size-20 md-small-size-50 md-xsmall-size-100"
        :type="'web'"
        :empty="false"
      />
      <div
        v-for="(app, index) in apps"
        :key="index"
        class="md-layout-item md-size-20 md-medium-size-20 md-small-size-50 md-xsmall-size-100"
      >
        <ApplicationsWebAppCard :app="app" />
      </div>
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
  },
  methods: {}
};
</script>

<style scoped></style>
