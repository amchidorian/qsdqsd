<template>
  <div>
    <md-tabs
      md-alignment="centered"
      style="margin-bottom:20px;"
    >
      <md-tab
        :md-label="'Applications Playstore ( ' + playApps.length + ' )'"
        @click="tab = 'play'"
      />
      <md-tab
        :md-label="'Applications Web ( ' + webApps.length + ' )'"
        @click="tab = 'web'"
      />
    </md-tabs>
    <PlayApps
      v-if="tab == 'play'"
      :apps="playApps"
    />
    <WebApps
      v-if="tab == 'web'"
      :apps="webApps"
    />
    <button
      id="refreshAppsBtn"
      style="display:none;"
      @click="refreshApps"
    />
  </div>
</template>

<script>
import { applicationsService } from "../_services/applications.service";
import PlayApps from "../components/applications/PlayApps";
import WebApps from "../components/applications/WebApps";
export default {
  name: "Applications",
  components: {
    PlayApps,
    WebApps
  },
  data() {
    return {
      tab: "play",
      playApps: [],
      webApps: []
    };
  },
  computed: {},
  beforeCreate() {
    applicationsService.getApplications().then(res => {
      this.webApps = res.webApps;
      this.playApps = res.playApps;
    });
  },
  methods: {
    refreshApps() {
      applicationsService
        .getApplications()
        .then(res => {
          console.log(res);
          this.webApps = res.webApps;
          this.playApps = res.playApps;
        })
        .catch(err => console.log(err));
    }
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
