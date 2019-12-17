<template>
  <div>
    <div class="md-layout md-gutter">
      <div
        class="md-layout-item md-size-80 md-medium-size-60 md-small-size-40 md-xsmall-size-0"
      />
      <div
        v-if="!updateMode"
        class="md-layout-item md-size-10 md-medium-size-20 md-small-size-30 md-xsmall-size-50"
      >
        <md-button
          class="md-primary"
          style="right:0; margin:1px;"
          @click="updateMode = true"
        >
          Editer
        </md-button>
      </div>
      <div
        v-if="!updateMode"
        class="md-layout-item md-size-10 md-medium-size-20 md-small-size-30 md-xsmall-size-50"
      >
        <md-button
          class="md-primary"
          style="right:0; margin:1px;"
          @click="updateMode = true"
        >
          Réinitialiser
        </md-button>
      </div>
      <div
        v-if="updateMode"
        class="md-layout-item md-size-10 md-medium-size-20 md-small-size-30 md-xsmall-size-50"
      >
        <md-button
          style="right:0; margin:1px;"
          class="md-primary validateColor"
          @click="saveRequirements()"
        >
          Valider
        </md-button>
      </div>
      <div
        v-if="updateMode"
        class="md-layout-item md-size-10 md-medium-size-20 md-small-size-30 md-xsmall-size-50"
      >
        <md-button
          style="right:0; margin:1px;"
          class="md-primary cancelColor"
          @click="cancelRequirements()"
        >
          Annuler
        </md-button>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field
          :class="{ 'md-invalid': errorToggled('passwordScope') }"
          @click="untoggleError()"
        >
          <label>Type de mot de passe :</label>
          <md-select
            id="typeParam"
            v-model="requirements.passwordScope"
            name="typeParam"
            md-dense
            placeholder="Type de paramétrage :"
            :disabled="!updateMode"
          >
            <md-option value="SCOPE_DEVICE">
              Mot de passe Téléphone
            </md-option>
            <md-option
              value="SCOPE_PROFILE"
            >
              Mot de passe Utilisateur
            </md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          :class="{
            'md-invalid': errorToggled('passwordQuality')
          }"
          @click="untoggleError()"
        >
          <label for="typeParam">Définir le type de mot de passe :</label>
          <md-select
            id="typeParam"
            v-model="requirements.passwordQuality"
            name="typeParam"
            md-dense
            :disabled="!updateMode"
          >
            <md-option value="SOMETHING">
              Basique
            </md-option>
            <md-option value="NUMERIC">
              Numérique
            </md-option>
            <md-option value="NUMERIC_COMPLEX">
              Numérique Avancé
            </md-option>
            <md-option value="ALPHABETIC">
              Alphabétique
            </md-option>
            <md-option value="ALPHANUMERIC">
              Alphanumérique
            </md-option>
            <md-option value="COMPLEX">
              Avancé
            </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div
      v-if="!wipeOnError"
      class="md-layout-item md-small-size-100"
    >
      <md-switch
        v-model="wipeOnError"
        :disabled="!updateMode"
        :class="{
          'md-invalid': errorToggled('maximumFailedPasswordsForWipe')
        }"
        @click="untoggleError()"
      >
        Effacer les données contenu sur l'appareil si trop d'erreur de mot de
        passe
      </md-switch>
    </div>
    <div
      v-else
      class="md-layout md-gutter"
    >
      <div class="md-layout-item md-small-size-100">
        <md-switch
          v-model="wipeOnError"
          :disabled="!updateMode"
          :class="{
            'md-invalid': errorToggled('maximumFailedPasswordsForWipe')
          }"
          @click="untoggleError()"
        >
          Effacer les données contenu sur l'appareil si trop de mot de passe
          incorrect
        </md-switch>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          :class="{
            'md-invalid': errorToggled('maximumFailedPasswordsForWipe')
          }"
          @click="untoggleError()"
        >
          <label>Définir le nombre d'essai :</label>
          <md-input
            v-model="requirements.maximumFailedPasswordsForWipe"
            :disabled="!updateMode"
            type="number"
          />
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field
          :disabled="!updateMode"
          :class="{
            'md-invalid': errorToggled('passwordMinimumLength')
          }"
          @click="untoggleError()"
        >
          <label>Définir la longueur minimum du mot de passe :</label>
          <md-input
            v-model="requirements.passwordMinimumLength"
            type="number"
            :disabled="!updateMode"
          />
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          v-if="requirements.passwordQuality === 'COMPLEX'"
          :class="{
            'md-invalid': errorToggled('passwordMinimumLetters')
          }"
          @click="untoggleError()"
        >
          <label>Définir le nombre minimum de lettres :</label>
          <md-input
            v-model="requirements.passwordMinimumLetters"
            type="number"
            :disabled="!updateMode"
          />
        </md-field>
      </div>
    </div>

    <div
      v-if="requirements.passwordQuality === 'COMPLEX'"
      class="md-layout md-gutter"
    >
      <div class="md-layout-item md-small-size-100">
        <md-field
          :class="{
            'md-invalid': errorToggled('passwordMinimumLowerCase')
          }"
          @click="untoggleError()"
        >
          <label>Définir le nombre minimum de lettres minuscule:</label>
          <md-input
            v-model="requirements.passwordMinimumLowerCase"
            :disabled="!updateMode"
            type="number"
          />
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          :class="{
            'md-invalid': errorToggled('passwordMinimumUpperCase')
          }"
          @click="untoggleError()"
        >
          <label>Définir le nombre minimum de lettres majuscules:</label>
          <md-input
            v-model="requirements.passwordMinimumUpperCase"
            :disabled="!updateMode"
            type="number"
          />
        </md-field>
      </div>
    </div>

    <div
      v-if="requirements.passwordQuality === 'COMPLEX'"
      class="md-layout md-gutter"
    >
      <div class="md-layout-item md-small-size-100">
        <md-field
          :class="{
            'md-invalid': errorToggled('passwordMinimumSymbols')
          }"
          @click="untoggleError()"
        >
          <label>Définir le nombre minimum de symbols (_,-@... ):</label>
          <md-input
            v-model="requirements.passwordMinimumSymbols"
            class="error"
            :disabled="!updateMode"
            type="number"
          />
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-100">
        <md-field
          :class="{
            'md-invalid': errorToggled('passwordMinimumNumeric')
          }"
          @click="untoggleError()"
        >
          <label>Définir le nombre minimum de caractère numériques :</label>
          <md-input
            v-model="requirements.passwordMinimumNumeric"
            :disabled="!updateMode"
            type="number"
          />
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
import { groupeService } from "../../../_services/groupe.service";

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
    if (this.requirements === null) {
      this.requirements = this.passwordRequirements;
    }
    console.log("this.requirements");
    console.log(this.requirements);
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
        groupeService
          .savePasswordRequirements({
            pass: this.requirements,
            policyId: this.$router.history.current.params.id
          })
          .then(res => {
            console.log("groupeService savePasswordRequirements");
            document.getElementById("refreshGroupeBtn").click();
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
