<template>
  <md-card>
    <md-card-media>
      <img :src="app.icon" />
    </md-card-media>

    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <div>
          <DeleteApplication
            :app="app"
            v-on:clicked-show-detail="clickedShowDetailModale()"
          />
        </div>

        <md-card-expand-trigger>
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </md-card-actions>

      <md-card-expand-content>
        <md-card-content>
          {{ app.name }}
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>

<script>
import DeleteApplication from "../dialogs/applications/DeleteApplication";

export default {
  name: "ApplicationsWebAppCard",
  components: { DeleteApplication },
  props: {
    app: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    clickedShowDetailModale: function(value) {
      this.$parent.$emit("clickede-show-detail", true);
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
