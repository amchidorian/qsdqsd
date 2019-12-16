<template lang="html">
  <div>
    <md-card
      md-with-hover
      style="height:100%; margin-bottom:20px;"
      v-if="!empty"
    >
      <md-ripple>
        <div style="height:100%;" @click="showDialog = true">
          <md-card-actions style="height: 100%; width:70%; margin-left: 15%;">
            <md-icon class="md-size-2x">add</md-icon>
            <span
              v-if="type == 'play'"
              class="md-subhead test"
              style="margin-left: 10px;"
              >Ajouter une Application <br />
              du PlayStore</span
            ><span v-else class="md-subhead" style="margin-left: 10px;"
              >Ajouter une Application Web</span
            >
          </md-card-actions>
        </div>
      </md-ripple>
    </md-card>
    <md-button
      v-if="empty"
      class="md-primary md-layout-item md-size-100"
      @click="showDialog = true"
    >
      Ajouter une Application</md-button
    >
    <md-dialog
      :md-active.sync="showDialog"
      v-bind:class="{ avatarCropper: avatarMode }"
    >
      <md-dialog-title v-if="type == 'play'"
        >Ajouter une Application du PlayStore</md-dialog-title
      >
      <md-dialog-title v-else>Ajouter une Application Web</md-dialog-title>

      <div
        class="md-layout md-gutter md-alignment-top-center"
        v-if="type == 'play'"
      >
        <div class="md-layout-item md-size-90">
          <md-field :class="messageClass" @click="error = false">
            <label>URL du PlayStore :</label>
            <md-input v-model="app.play.source"></md-input>
          </md-field>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-top-center" v-else>
        <div class="md-layout-item md-size-90">
          <md-field :class="messageClass" @click="error = false">
            <label>URL de l'application :</label>
            <md-input v-model="app.web.source"></md-input>
          </md-field>
          <md-field :class="messageClass" @click="error = false">
            <label>Nom de l'application :</label>
            <md-input v-model="app.web.name"></md-input>
          </md-field>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary">
          Annuler
        </md-button>
        <md-button
          v-if="type == 'play'"
          class="md-primary"
          @click="savePlayStoreApp()"
        >
          Créer
        </md-button>
        <button
          v-if="type == 'web'"
          :md-ripple="false"
          id="pick-avatare"
          class="md-primary"
        >
          <md-button class="md-primary" @click="avatarMode = true">
            Définir une Icone
          </md-button>
        </button>
        <AvatarCropper
          trigger="#pick-avatare"
          @uploaded="handleUploaded"
          @completed="handleCompleted"
          @error="handlerError"
          @uploading="handleUploading"
          :labels="labels"
          :upload-url="url"
        />
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { applicationsService } from "../../../_services/applications.service";
import AvatarCropper from "vue-avatar-cropper";
export default {
  name: "AddApp",
  components: { AvatarCropper },
  props: {
    type: String,
    empty: String
  },
  data: () => ({
    showDialog: false,
    error: false,
    avatarMode: false,
    labels: {
      submit: "Créer l'Application",
      cancel: "Annuler"
    },
    app: {
      web: {
        name: "",
        source: ""
      },
      play: {
        source: ""
      }
    }
  }),
  methods: {
    close() {
      this.userInput = "";
      this.error = false;
      this.showDialog = false;
    },
    handleUploading(form) {
      form.append("name", this.app.web.name);
      form.append("source", this.app.web.source);
    },
    handleUploaded() {},
    handleCompleted() {},
    handlerError() {},
    refreshApps() {},
    savePlayStoreApp() {
      applicationsService.savePlayStoreApp(this.app.play.source).then(res => {
        document.getElementById("refreshAppsBtn").click();
        this.showDialog = false;
      });
    }
  },
  computed: {
    messageClass() {
      return {
        "md-invalid": this.error
      };
    }
  }
};
</script>

<style scoped>
.deleteDeviceWarning {
  background-color: #ffa5006b !important;
  margin-left: 2% !important;
  margin-top: -10px;
  margin-bottom: 5px !important;
}

.dialogDeleteDevice {
}

.headerDialogDeleteDevice {
  border: solid !important;
  border-width: 0 0 1px 0 !important;
  background-color: #d40f0f40 !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

.avatarCropper {
  height: 50% !important;
}
</style>
