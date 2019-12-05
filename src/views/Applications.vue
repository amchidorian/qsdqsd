<template>
  <div>
    <md-tabs md-alignment="centered" style="margin-bottom:20px;">
      <md-tab
        :md-label="'Applications Playstore (' + 3 + ')'"
        @click="tab = 'play'"
      ></md-tab>
      <md-tab
        :md-label="'Applications Playstore (' + 6 + ')'"
        @click="tab = 'web'"
      ></md-tab>
    </md-tabs>
    <PlayApps :apps="playApps" v-if="tab == 'play'" />
    <WebApps :apps="webApps" v-if="tab == 'web'" />
  </div>
</template>

<script>
import PlayApps from "../components/applications/PlayApps";
import WebApps from "../components/applications/WebApps";
import { mapGetters } from "vuex";
export default {
  name: "Applications",
  components: {
    PlayApps,
    WebApps
  },
  data() {
    return {
      tab: "play"
    };
  },
  computed: {
    ...mapGetters({
      webApps: "applicationService/get_web_apps",
      playApps: "applicationService/get_play_apps"
    })
  },
  beforeCreate() {
    this.$store.dispatch("applicationService/getApps");
  },
  methods: {
    // removeApp(app) {
    //   this.openRemoveAppModal = true;
    //   this.appToDelete = app;
    // },
    // addPlayApp() {
    //   this.addType = "play";
    //   this.openAddAppsModal = true;
    // },
    // addWebApp() {
    //   this.addType = "web";
    //   this.openAddAppsModal = true;
    // }
  }
};
</script>

<style>
.deviceDetails {
  text-align: left;
  margin-left: 20px;
}

.columnPolicies {
  margin-bottom: 20px;
}

.detailsData {
  text-align: left;
}

.detailsTitle {
  margin-top: 5px;
}

.custom-block.warning {
  background-color: rgba(255, 229, 100, 0.3);
  border-color: #e7c000;
  color: #6b5900;
}
</style>
