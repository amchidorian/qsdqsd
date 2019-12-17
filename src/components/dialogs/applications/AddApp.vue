<template lang="html">
  <div>
    <md-card
      v-if="!empty"
      md-with-hover
      style="height:100%; margin-bottom:20px;"
    >
      <md-ripple>
        <div
          style="height:100%;"
          @click="showDialog = true"
        >
          <md-card-actions style="height: 100%; width:70%; margin-left: 15%;">
            <md-icon class="md-size-2x">
              add
            </md-icon>
            <span
              v-if="type == 'play'"
              class="md-subhead test"
              style="margin-left: 10px;"
            >Ajouter une Application <br>
              du PlayStore</span><span
              v-else
              class="md-subhead"
              style="margin-left: 10px;"
            >Ajouter une Application Web</span>
          </md-card-actions>
        </div>
      </md-ripple>
    </md-card>
    <md-button
      v-if="empty"
      class="md-primary md-layout-item md-size-100"
      @click="showDialog = true"
    >
      Ajouter une Application
    </md-button>
    <md-dialog
      :md-active.sync="showDialog"
      :class="{ avatarCropper: avatarMode }"
    >
      <md-dialog-title
        v-if="type == 'play'"
      >
        Ajouter une Application du PlayStore
      </md-dialog-title>
      <md-dialog-title v-else>
        Ajouter une Application Web
      </md-dialog-title>

      <div
        v-if="type == 'play'"
        class="md-layout md-gutter md-alignment-top-center"
      >
        <div class="md-layout-item md-size-90">
          <span
            class="md-subheading"
          >Afin d'ajouter une application, il suffit de récupérer son adresse
            depuis le
            <a
              href="https://play.google.com"
              target="_blank"
            >playstore</a>.</span>
          <md-field>
            <label>URL du PlayStore :</label>
            <md-input v-model="app.play.source" />
          </md-field>
        </div>
      </div>
      <div
        v-else
        class="md-layout md-gutter md-alignment-top-center"
      >
        <div class="md-layout-item md-size-90">
          <md-field
            :class="[
              { 'md-invalid': error.web.missingName || error.web.duplicateName }
            ]"
          >
            <label>Nom de l'application :</label>
            <md-input v-model="app.web.name" />
            <span
              v-if="error.web.missingName"
              class="md-error"
            >Ce champs est requis</span>
            <span
              v-if="error.web.duplicateName"
              class="md-error"
            >L'Application " {{ app.web.name }} " existe deja.</span>
          </md-field>
          <md-field
            :class="[
              { 'md-invalid': error.web.missingUrl || error.web.invalidUrl }
            ]"
          >
            <label>URL de l'application :</label>
            <md-input v-model="app.web.source" />
            <span
              v-if="error.web.missingUrl"
              class="md-error"
            >Ce champs est requis</span>
            <span
              v-if="error.web.invalidUrl"
              class="md-error"
            >L'adresse n'est pas correcte.</span>
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
        <md-button
          v-if="type == 'web'"
          class="md-primary"
          @click="nextStepIcon()"
        >
          Définir une Icone
        </md-button>
        <button
          v-if="type == 'web'"
          id="pick-avatare"
          style="display:none;"
          :md-ripple="false"
          class="md-primary"
        />
        <AvatarCropper
          trigger="#pick-avatare"
          :labels="labels"
          :upload-headers="headers"
          :upload-url="url"
          @uploaded="handleUploaded"
          @completed="handleCompleted"
          @error="handlerError"
          @uploading="handleUploading"
        />
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { applicationsService } from "../../../_services/applications.service";
import { headers } from "../../../_helpers/request-options";
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
    url: "http://localhost:8000/api/apps/web",
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
    },
    error: {
      web: {
        duplicateName: false,
        missingName: false,
        invalidUrl: false,
        missingUrl: false
      }
    }
  }),
  computed: {
    headers() {
      return localStorage.getItem("currentUser")
        ? { Authorization: "Bearer " + localStorage.getItem("currentUser") }
        : {};
    }
  },
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
    handleUploaded() {
      console.log("handleUploaded");
    },
    handleCompleted() {
      console.log("handleCompleted");
    },
    handlerError() {
      console.log("handlerError");
    },
    nextStepIcon() {
      if (this.app.web.name === "" || this.app.web.source === "") {
        if (this.app.web.name === "") {
          this.error.web.missingName = true;
        }
        if (this.app.web.source === "") {
          this.error.web.missingUrl = true;
        }
      } else {
        applicationsService
          .checkWebAppName({
            name: this.app.web.name,
            source: this.app.web.source
          })
          .then(res => {
            this.avatarMode = true;
            document.getElementById("pick-avatare").click();
          })
          .catch(err => {
            if (err.exception == "InvalidURLException") {
              this.error.web.invalidUrl = true;
            } else if (err.exception == "DuplicateNameException") {
              this.error.web.duplicateName = true;
            }
          });
      }
    },
    refreshApps() {},
    savePlayStoreApp() {
      applicationsService.savePlayStoreApp(this.app.play.source).then(res => {
        document.getElementById("refreshAppsBtn").click();
        this.showDialog = false;
      });
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
