<template>
  <div class="md-layout md-gutter">
    <md-empty-state
      md-icon="apps"
      md-label="Aucune Application Web n'a été enregistré."
      md-description="En les enregistrant, vous pourrez les assignants à un groupe permettant de les installer automatiquement sur les appareils associés."
      v-if="apps.length == 0"
    >
      <AddApp style="height: 100%;" :empty="true" :type="'web'" />
    </md-empty-state>
    <div
      class="md-layout md-gutter md-layout-item md-size-100 "
      v-if="apps.length > 0"
    >
      <AddApp :type="'web'" :empty="false" md-dynamic-height />
      <div
        class="md-layout-item md-size-20 md-medium-size-20 md-small-size-50 md-xsmall-size-100 columnPolicies"
        v-for="(app, index) in apps"
        :key="index"
      >
        <ApplicationsWebAppCard
          :app="app"
          v-on:clickede-show-detail="clickedShowDetailModales()"
        />
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
  methods: {
    clickedShowDetailModales: function(value) {
      this.$emit("clicked-show-detail", true);
    }
  }
};
</script>

<style scoped></style>
