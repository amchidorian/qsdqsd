<template>
  <div class="policyApp">
    <div class="policyHeader">
      <md-tabs md-alignment="centered" style="margin-bottom:20px;">
        <md-tab md-label="Paramètres Généraux" @click="tab = 'gen'"></md-tab>
        <md-tab md-label="Paramètres Spécifique" @click="tab = 'spe'"></md-tab>
      </md-tabs>

      <div
        class="md-layout md-gutter"
        style="margin-left:20px; top:0;"
        v-if="tab == 'gen'"
      >
        <div class="md-layout-item md-size-80" v-if="!updateMode">
          <md-switch v-model="displayInfosSup">
            Afficher les informations Supplémentaires
          </md-switch>
        </div>
        <div class="md-layout-item md-size-60" v-else>
          <md-switch v-model="displayInfosSup">
            Afficher les informations Supplémentaires
          </md-switch>
        </div>

        <div class="md-layout-item md-size-20" v-if="!updateMode">
          <md-button class="md-primary" @click="updateMode = true">
            Editer
            <md-icon>edit</md-icon>
          </md-button>
        </div>
        <div class="md-layout-item md-size-20" v-if="updateMode">
          <md-button
            style="right:0;"
            class="md-primary validateColor"
            @click="updatePolicy()"
          >
            Valider les mises a jour
          </md-button>
        </div>
        <div class="md-layout-item md-size-20" v-if="updateMode">
          <md-button
            class="md-primary cancelColor"
            @click="cancelUpdatePolicy()"
          >
            Annuler les mises à jour
          </md-button>
        </div>
      </div>
    </div>
    <div class="policyGlobal" v-if="tab == 'gen'">
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field style="padding-top:0;">
            <label class="specTitle">Système</label>
            <md-input disabled></md-input>
          </md-field>
        </div>
      </div>
      <PolicySpec
        :type="'sys'"
        :policy="system"
        :displayInfosSup="displayInfosSup"
        :updateMode="updateMode"
      />
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field>
            <label class="specTitle">Périphériques</label>
            <md-input disabled></md-input>
          </md-field>
        </div>
      </div>
      <PolicySpec
        :type="'phone'"
        :policy="phone"
        :displayInfosSup="displayInfosSup"
        :updateMode="updateMode"
      />
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field>
            <label class="specTitle">Réseaux</label>
            <md-input disabled></md-input>
          </md-field>
        </div>
      </div>
      <PolicySpec
        :type="'reseau'"
        :policy="network"
        :displayInfosSup="displayInfosSup"
        :updateMode="updateMode"
      />
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field>
            <label class="specTitle">Applications du PlayStore</label>
            <md-input disabled></md-input>
          </md-field>
        </div>
      </div>
      <ApplicationSpec
        :type="'play'"
        :apps="others.applications.value.play"
        :updateMode="updateMode"
      />
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field>
            <label class="specTitle">Applications Web</label>
            <md-input disabled></md-input>
          </md-field>
        </div>
      </div>
      <ApplicationSpec
        :type="'web'"
        :apps="others.applications.value.web"
        :updateMode="updateMode"
      />
    </div>
    <div class="policyGlobal" v-if="tab == 'spe'">
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field style="padding-top:0;">
            <label class="specTitle">Sécurité / Vérouillage</label>
            <md-input disabled></md-input>
          </md-field>
          <PasswordSpec :requirements="others.passwordRequirements.value" />
        </div>
      </div>
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field style="padding-top:0;">
            <label class="specTitle">Règles de Conformité</label>
            <md-input disabled></md-input>
          </md-field>
          <ComplianceSpec
            :compliances="others.policyEnforcementRules.value"
            :policy="[phone, network, system]"
          />
        </div>
      </div>
      <div class="md-layout md-gutter" style="margin:40px;">
        <div class="md-layout-item md-size-100">
          <md-field style="padding-top:0;">
            <label class="specTitle">Gestion des Permissions</label>
            <md-input disabled></md-input>
          </md-field>
          <PermissionSpec
            :permissionPolicy="others.defaultPermissionPolicy"
            :permissionsGrant="others.permissionGrants"
            :policy="[phone, network, system]"
          />
        </div>
      </div>
    </div>
    <button
      id="refreshGroupeBtn"
      v-on:click="getGroup"
      style="display:none;"
    ></button>
  </div>
</template>

<script>
import { groupeService } from "../_services/groupe.service";
import PolicySpec from "../components/policy/specsRow/PolicySpec";
import PermissionSpec from "../components/policy/specsRow/PermissionSpec";
import ComplianceSpec from "../components/policy/specsRow/ComplianceSpec";
import PasswordSpec from "../components/policy/specsRow/PasswordSpec";
import ApplicationSpec from "../components/policy/specsRow/ApplicationSpec";

export default {
  name: "Policy",
  components: {
    PolicySpec,
    ApplicationSpec,
    PasswordSpec,
    ComplianceSpec,
    PermissionSpec
  },
  data() {
    return {
      tab: "gen",
      updateMode: false,
      displayInfosSup: true,
      set: [],
      unset: [],
      items: [
        { name: "Restriction", id: "restri" },
        { name: "Applications", id: "app" },
        { name: "Sécurité", id: "secu" },
        { name: "Règles Conformité", id: "compliance" },
        { name: "Permissions", id: "permissions" }
      ],
      policy: [],
      phone: [],
      network: [],
      system: [],
      apps: [],
      others: []
    };
  },
  computed: {},
  beforeCreate() {
    groupeService
      .getGroupe(this.$router.history.current.params.id)
      .then(res => {
        console.log("groupeService getGroupe");
        this.policy = res.policy;
        this.phone = res.phone;
        this.network = res.network;
        this.system = res.system;
        this.apps = res.apps;
        this.others = res.others;
      });
  },
  methods: {
    updatePolicy() {
      var p = {
        phone: { ...this.phone },
        network: { ...this.network },
        system: { ...this.system },
        apps: { ...this.others.applications.value }
      };
      groupeService
        .updateGroupe({
          id: this.$router.history.current.params.id,
          data: p
        })
        .then(res => {
          console.log("groupeService updateGroupe");
          this.getGroup();
        });
      this.updateMode = false;
    },
    getGroup() {
      groupeService
        .getGroupe(this.$router.history.current.params.id)
        .then(res => {
          this.policy = res.policy;
          this.phone = res.phone;
          this.network = res.network;
          this.system = res.system;
          this.apps = res.apps;
          this.others = res.others;
        });
    },
    cancelUpdatePolicy() {
      this.getGroup();
      this.updateMode = false;
    }
  }
};
</script>

<style scope>
.test {
  width: 100%;
  text-align: right !important;
  display: block !important;
}
.validateColor {
  color: green !important;
}

.cancelColor {
  color: red !important;
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
.specsTitle {
  text-align: center;
}

.deviceDetails {
  text-align: left;
  margin-left: 20px;
}

.policyApp {
  height: 100% !important;
  width: 100% !important;
}

.policyHeader {
  height: 12% !important;
  width: 100% !important;
}

.specTitle {
  color: orange !important;
  font-size: 20px !important;
}

.policyGlobal {
  height: 88% !important;
  width: 100% !important;
  overflow: scroll;
}

/* .specTitle {
  position: sticky !important;
  top: 0;
} */

.policyGlobal::-webkit-scrollbar {
  width: 0 !important;
}
.policyApp::-webkit-scrollbar {
  width: 0 !important;
}

.columnPolicies {
  margin-bottom: 20px;
}
.sideMenu {
  position: absolute !important;
  top: 150px !important;
  right: 10px;
  z-index: 10;
}

.detailsData {
  text-align: left;
}

.detailsTitle {
  margin-top: 5px;
}
.test {
  right: 0;
}

.custom-block.warning {
  background-color: rgba(255, 229, 100, 0.3);
  border-color: #e7c000;
  color: #6b5900;
}
</style>
