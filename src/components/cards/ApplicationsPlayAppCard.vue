<template>
  <md-card style="height:100%;">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ app.name }}</div>
      </md-card-header-text>

      <md-card-media md-medium>
        <img :src="app.icon" />
      </md-card-media>
    </md-card-header>

    <md-card-actions>
      <DeleteApplication />
    </md-card-actions>
  </md-card>
</template>

<script>
// import DeleteDevice from "../dialogs/DeleteDevice";
import DeleteApplication from "../dialogs/applications/DeleteApplication";

export default {
  name: "ApplicationsPlayAppCard",
  components: { DeleteApplication },
  props: {
    app: {
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
