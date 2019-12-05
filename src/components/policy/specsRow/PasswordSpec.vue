<template>
  <div>
    <div class="md-size-25 passwordBtn">
      <div class="md-size-25">
        <md-button
          class="md-primary"
          v-if="!updateMode"
          @click="updateMode = true"
        >
          Editer
          <md-icon>edit</md-icon>
        </md-button>
      </div>
      <div class="md-size-25">
        <md-button
          class="md-primary"
          v-if="updateMode"
          @click="updateMode = true"
        >
          Réinitialiser
        </md-button>
      </div>
      <div class="md-size-25">
        <md-button
          style="right:0; margin:1px;"
          class="md-primary validateColor"
          v-if="updateMode"
          @click="saveRequirements()"
        >
          Valider
        </md-button>
      </div>
      <div class="md-size-25">
        <md-button
          style="right:0; margin:1px;"
          class="md-primary cancelColor"
          v-if="updateMode"
          @click="cancelRequirements()"
        >
          Annuler
        </md-button>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field
          v-bind:class="{ 'md-invalid': errorToggled('passwordScope') }"
          @click="untoggleError()"
        >
          <label>Type de mot de passe :</label>
          <md-select
            name="typeParam"
            id="typeParam"
            v-model="requirements.passwordScope"
            md-dense
            placeholder="Type de paramétrage :"
            :disabled="!updateMode"
          >
            <md-option value="SCOPE_DEVICE">Mot de passe Téléphone</md-option>
            <md-option value="SCOPE_PROFILE"
              >Mot de passe Utilisateur</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          v-bind:class="{
            'md-invalid': errorToggled('passwordQuality')
          }"
        >
          <label for="typeParam">Définir le type de mot de passe :</label>
          <md-select
            name="typeParam"
            id="typeParam"
            v-model="requirements.passwordQuality"
            md-dense
            :disabled="!updateMode"
          >
            <md-option value="SOMETHING">Basique</md-option>
            <md-option value="NUMERIC">Numérique</md-option>
            <md-option value="NUMERIC_COMPLEX">Numérique Avancé</md-option>
            <md-option value="ALPHABETIC">Alphabétique</md-option>
            <md-option value="ALPHANUMERIC">Alphanumérique</md-option>
            <md-option value="COMPLEX">Avancé</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="md-layout-item md-small-size-100" v-if="!wipeOnError">
      <md-switch
        @click="untoggleError()"
        v-model="wipeOnError"
        :disabled="!updateMode"
        v-bind:class="{
          'md-invalid': errorToggled('maximumFailedPasswordsForWipe')
        }"
        >Effacer les données contenu sur l'appareil si trop d'erreur de mot de
        passe
      </md-switch>
    </div>
    <div class="md-layout md-gutter" v-else>
      <div class="md-layout-item md-small-size-100">
        <md-switch
          @click="untoggleError()"
          v-model="wipeOnError"
          :disabled="!updateMode"
          v-bind:class="{
            'md-invalid': errorToggled('maximumFailedPasswordsForWipe')
          }"
          >Effacer les données contenu sur l'appareil si trop de mot de passe
          incorrect
        </md-switch>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          v-bind:class="{
            'md-invalid': errorToggled('maximumFailedPasswordsForWipe')
          }"
        >
          <label>Définir le nombre d'essai :</label>
          <md-input
            :disabled="!updateMode"
            v-model="requirements.maximumFailedPasswordsForWipe"
            type="number"
          ></md-input>
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          :disabled="!updateMode"
          v-bind:class="{
            'md-invalid': errorToggled('passwordMinimumLength')
          }"
        >
          <label>Définir la longueur minimum du mot de passe :</label>
          <md-input
            v-model="requirements.passwordMinimumLength"
            type="number"
            :disabled="!updateMode"
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          v-if="requirements.passwordQuality === 'COMPLEX'"
          v-bind:class="{
            'md-invalid': errorToggled('passwordMinimumLetters')
          }"
        >
          <label>Définir le nombre minimum de lettres :</label>
          <md-input
            v-model="requirements.passwordMinimumLetters"
            type="number"
            :disabled="!updateMode"
          ></md-input>
        </md-field>
      </div>
    </div>

    <div
      class="md-layout md-gutter"
      v-if="requirements.passwordQuality === 'COMPLEX'"
    >
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          v-bind:class="{
            'md-invalid': errorToggled('passwordMinimumLowerCase')
          }"
        >
          <label>Définir le nombre minimum de lettres minuscule:</label>
          <md-input
            :disabled="!updateMode"
            v-model="requirements.passwordMinimumLowerCase"
            type="number"
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          v-bind:class="{
            'md-invalid': errorToggled('passwordMinimumUpperCase')
          }"
        >
          <label>Définir le nombre minimum de lettres majuscules:</label>
          <md-input
            :disabled="!updateMode"
            v-model="requirements.passwordMinimumUpperCase"
            type="number"
          ></md-input>
        </md-field>
      </div>
    </div>

    <div
      class="md-layout md-gutter"
      v-if="requirements.passwordQuality === 'COMPLEX'"
    >
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          v-bind:class="{
            'md-invalid': errorToggled('passwordMinimumSymbols')
          }"
        >
          <label>Définir le nombre minimum de symbols (_,-@... ):</label>
          <md-input
            class="error"
            :disabled="!updateMode"
            v-model="requirements.passwordMinimumSymbols"
            type="number"
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          @click="untoggleError()"
          v-bind:class="{
            'md-invalid': errorToggled('passwordMinimumNumeric')
          }"
        >
          <label>Définir le nombre minimum de caractère numériques :</label>
          <md-input
            :disabled="!updateMode"
            v-model="requirements.passwordMinimumNumeric"
            type="number"
          ></md-input>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "PasswordSpec",
  components: {},
  props: {
    requirements: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      sending: false,
      passwordRequirements: {
        passwordScope: "",
        passwordQuality: "",
        passwordMinimumLength: "",
        passwordMinimumLetters: "",
        passwordMinimumLowerCase: "",
        passwordMinimumSymbols: "",
        passwordMinimumNumeric: "",
        passwordMinimumUpperCase: "",
        maximumFailedPasswordsForWipe: ""
      },
      wipeOnError: false,
      savedRequirements: false,
      updateMode: false,
      errors: []
    };
  },
  computed: {},
  watch: {
    wipeOnError() {
      if (!this.wipeOnError) {
        this.passwordRequirements.maximumFailedPasswordsForWipe = 0;
      }
    },
    wipeOnErrorUnset() {}
  },
  beforeCreate() {},
  created() {
    this.savedRequirements = this.requirements === null ? false : true;
  },
  methods: {
    disabledInput(type) {
      if (type === "scope") {
        return this.passwordRequirements.passwordScope === "" ? true : false;
      }
      if (type === "spec") {
        return this.passwordRequirements.passwordQuality === "" ? true : false;
      }
    },
    dataToDisplay(type) {
      const data = this.traduction.filter(t => {
        if (type === "scope") {
          if (t.google === this.requirements.passwordScope) {
            return t;
          }
        } else if (type === "quality") {
          if (t.google === this.requirements.passwordQuality) {
            return t;
          }
        }
      });
      if (type === "wipe") {
        if (
          this.requirements.maximumFailedPasswordsForWipe === null ||
          this.requirements.maximumFailedPasswordsForWipe === 0
        ) {
          return "Fonctionnalité désactiver";
        } else {
          return this.requirements.maximumFailedPasswordsForWipe;
        }
      }
      return data[0].trad;
    },
    showForm() {
      this.updateMode = true;
    },
    cancelRequirements() {
      this.untoggleError();
      this.updateMode = false;
      this.wipeOnErrorSet = false;
      this.wipeOnErrorUnset = false;
      this.passwordRequirements = {
        passwordScope: "",
        passwordQuality: "",
        passwordMinimumLength: "",
        passwordMinimumLetters: "",
        passwordMinimumLowerCase: "",
        passwordMinimumSymbols: "",
        passwordMinimumNumeric: "",
        passwordMinimumUpperCase: "",
        maximumFailedPasswordsForWipe: ""
      };
    },
    saveRequirements() {
      this.untoggleError();

      if (this.checkData()) {
        this.$store.dispatch("policyService/savePasswordRequirements", {
          pass: this.requirements,
          policyId: this.$router.history.current.params.id
        });
        this.cancelRequirements();
      }
    },
    checkData() {
      console.log("checkData");
      if (this.requirements.passwordScope === "COMPLEX") {
        return this.checkDataScopeComplex();
      } else {
        return this.checkDataOtherScope();
      }
    },
    checkDataScopeComplex() {
      var noError = true;
      for (const i in this.requirements) {
        if (this.requirements[i] === "") {
          this.errors.push(i);
          noError = false;
        }
      }
      return noError;
    },
    checkDataOtherScope() {
      var noError = true;
      for (const i in this.requirements) {
        if (
          i === "passwordScope" ||
          i === "passwordQuality" ||
          i === "passwordMinimumLength"
        ) {
          if (this.requirements[i] === "") {
            this.errors.push(i);
            noError = false;
          }
        }
      }
      return noError;
    },
    errorToggled(type) {
      return this.errors.filter(e => e === type).length === 0 ? false : true;
    },
    untoggleError() {
      this.errors = [];
    }
  }
};
</script>

<style>
.test {
  width: 100%;
  text-align: right !important;
  display: block !important;
}
.testd {
  width: 100%;
  text-align: left !important;
  display: block !important;
}
.testicon {
  margin-left: 20px !important;
}
.testdicon {
  margin-right: 20px !important;
}
.left-divider {
  padding-right: 0 !important;
  border-color: gray;
  border-top-width: 0;
  border-left-width: 1px;
  border-left-style: solid;
  height: auto !important;
}

.right-divider {
  height: auto !important;
}

.lists {
  min-height: 70px !important;
}

.deviceDetails {
  text-align: left;
  margin-left: 20px;
}
.vertical-divider {
  border-top-width: 0;
  border-right-width: 1px;
  border-right-style: solid;
  height: 100%;
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
sui-grid {
  height: 100%;
  width: 100%;
}
.formInput {
  width: 70px !important;
  margin: 5px;
}
.formRadio {
  margin: 5px;
}
.formRadio {
  position: fixed;
  right: 0;
  margin-top: -15px;
}

.passwordBtn {
  position: absolute !important;
  right: 0 !important;
  margin-top: -15px !important;
}
</style>
