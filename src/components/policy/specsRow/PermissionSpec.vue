<template>
  <div>
    <p>
      Les permissions permettent d'autoriser ou refuser les demandes d'accès aux
      fonctionnalités émise par les applications.
    </p>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-60">
        <md-field>
          <label for="movie">
            Les demandes d'accès émissent par les applications sont :</label
          >
          <md-select v-model="globalPerm.value" name="movie" id="movie">
            <md-option value="GRANT">automatiquement acceptées</md-option>
            <md-option value="DENY">automatiquement refusées</md-option>
            <md-option value="PROMPT"
              >gérer au cas par cas par l'utilisateur</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-size-20">
        <md-button class="md-primary" @click="validGlobalUpdate"
          >Mettre a Jour</md-button
        >
      </div>
      <div class="md-layout-item md-size-20">
        <md-button class="md-accent" @click="cancelGlobalUpdate"
          >Annuler</md-button
        >
      </div>
    </div>
    <md-table>
      <md-table-row>
        <md-table-head>Nom de la permission</md-table-head>
        <md-table-head>Action</md-table-head>
        <md-table-head></md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>

      <md-table-row
        v-for="(perm, index) in setPermissionGroupGrant"
        :key="index"
      >
        <md-table-cell>{{ perm.text }}</md-table-cell>
        <md-table-cell v-if="editGrantGroup == index">
          <md-field>
            <md-select v-model="perm.value" name="movie" id="movie">
              <md-option value="GRANT">automatiquement acceptées</md-option>
              <md-option value="DENY">automatiquement refusées</md-option>
              <md-option value="PROMPT">gérer par l'utilisateur</md-option>
            </md-select>
          </md-field>
        </md-table-cell>
        <md-table-cell v-else>
          {{ getPermValueTraduction(perm.value) }}
        </md-table-cell>
        <md-table-cell class="cellTable" v-if="editGrantGroup == index">
          <md-button
            @click="saveUpdatedGrant(perm)"
            class="md-icon-button btnCreate"
          >
            <md-icon>check</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell class="cellTable" v-else>
          <md-button
            @click="editGrantGroup = index"
            class="md-icon-button btnTable"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell class="cellTable" v-if="editGrantGroup == index">
          <md-button
            class="md-icon-button btnCreate"
            @click="createMode = true"
          >
            <md-icon>cancel</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell class="cellTable" v-else>
          <md-button class="md-icon-button btnTable" @click="createMode = true">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <!-- <sui-tab>
              <sui-table-cell>
                <sui-icon
                  name="check"
                  color="green"
                  @click="saveUpdatedGrant(perm)"
                  v-if="editGrantGroup == index"
                />
                <sui-icon
                  name="pencil"
                  @click="editGrantGroup = index"
                  v-else
                />
              </sui-table-cell>
              <sui-table-cell>
                <sui-icon
                  name="close"
                  color="red"
                  @click="cancelEdit()"
                  v-if="editGrantGroup == index"
                />
                <sui-icon name="trash" v-else />
              </sui-table-cell>
            </sui-table-row>
            <sui-table-row v-if="!creationMode">
              <sui-table-cell colspan="3"></sui-table-cell>
              <sui-table-cell collapsing>
                <sui-icon name="plus" @click="creationMode = true" />
              </sui-table-cell>
            </sui-table-row>
            <sui-table-row v-else>
              <sui-table-cell>
                <sui-dropdown
                  placeholder="non défini"
                  selection
                  fluid
                  :options="unsetPermissionGroupGrant"
                  v-model="newGrantPerm.permission"
                />
              </sui-table-cell>
              <sui-table-cell>
                <sui-dropdown
                  placeholder="non défini"
                  selection
                  fluid
                  :options="dropdownOptions"
                  v-model="newGrantPerm.value"
                />
              </sui-table-cell>
              <sui-table-cell collapsing>
                <sui-icon
                  name="check"
                  color="green"
                  @click="savePermission()"
                />
              </sui-table-cell>
              <sui-table-cell collapsing>
                <sui-icon name="close" color="red" @click="cancelCreate()" />
              </sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </sui-tab-pane>
    </sui-tab> -->
  </div>
</template>

<script>
export default {
  name: "PermissionSpec",
  components: {},
  props: {
    permissionPolicy: {
      type: Object,
      default: function() {
        return [];
      }
    },
    permissionsGrant: {
      type: Object,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      policyId: null,
      creationMode: false,
      globalPerm: null,
      permissionGrantGroup: [
        {
          update: false,
          value: null,
          permission: "ACTIVITY_RECOGNITION",
          text: "Détection d'activités"
        },
        {
          update: false,
          value: null,
          permission: "CALENDAR",
          text: "Calendrier"
        },
        {
          update: false,
          value: null,
          permission: "CALL_LOG",
          text: "Téléphone"
        },
        {
          update: false,
          value: null,
          permission: "CAMERA",
          text: "Caméra"
        },
        {
          update: false,
          value: null,
          permission: "CONTACTS",
          text: "Contacts"
        },
        {
          update: false,
          value: null,
          permission: "LOCATION",
          text: "Localisation"
        },
        {
          update: false,
          value: null,
          permission: "MICROPHONE",
          text: "Microphone"
        },
        {
          update: false,
          value: null,
          permission: "PHONE",
          text: "Téléphone"
        },
        {
          update: false,
          value: null,
          permission: "SENSORS",
          text: "Capteurs Environnementaux"
        },
        {
          update: false,
          value: null,
          permission: "SMS",
          text: "SMS"
        },
        {
          update: false,
          value: null,
          permission: "STORAGE",
          text: "Espace de stockage"
        }
      ],
      setPermissionGroupGrant: [],
      unsetPermissionGroupGrant: [],
      editGrantGroup: null,
      newGrantPerm: {
        permission: null,
        value: null
      }
    };
  },
  computed: {},
  watch: {
    "globalPerm.value": function() {
      if (!this.globalPerm.update) {
        this.globalPerm.updated = true;
      }
      if (this.globalPerm.value === this.permissionPolicy.value) {
        this.globalPerm.updated = false;
      }
    },
    "permissionPolicy.value": function() {
      this.globalPerm = { ...this.permissionPolicy };
    },
    "permissionsGrant.value.length": function() {
      this.parsePermissionGrant();
      this.cancelCreate();
    }
  },
  created() {
    this.globalPerm = { ...this.permissionPolicy };
    this.policyId = this.$router.history.current.params.id;
    this.parsePermissionGrant();
  },
  methods: {
    cancelGlobalUpdate() {
      this.globalPerm = this.permissionPolicy.value;
    },
    validGlobalUpdate() {
      this.$store.dispatch("policyService/updatePolicyPermission", {
        id: this.policyId,
        perm: this.globalPerm.value
      });
    },
    parsePermissionGrant() {
      this.setPermissionGroupGrant = [];
      this.permissionsGrant.value.forEach(perm => {
        this.permissionGrantGroup.forEach(group => {
          if (perm.permission == group.permission) {
            group.value = perm.policy;
            this.setPermissionGroupGrant.push(group);
          }
        });
      });
      this.getUnsetGrantPerm();
    },
    getUnsetGrantPerm() {
      this.unsetPermissionGroupGrant = [];
      this.permissionGrantGroup.forEach(group => {
        if (group.value == null) {
          group.value = group.permission;
          this.unsetPermissionGroupGrant.push(group);
        }
      });
    },
    getPermValueTraduction(value) {
      if (value == "GRANT") {
        return "Automatiquement Acceptées";
      } else if (value == "DENY") {
        return "Automatiquement Refusées";
      } else if (value == "PROMPT") {
        return "Gérer par l'utilisateur";
      }
    },
    cancelEdit() {
      this.editGrantGroup = null;
      this.parsePermissionGrant();
    },
    cancelCreate() {
      this.newGrantPerm = {
        permission: null,
        value: null
      };
      this.creationMode = false;
    },
    savePermission() {
      this.$store.dispatch("policyService/saveGrantPermission", {
        id: this.policyId,
        perm: this.newGrantPerm
      });
    },
    saveUpdatedGrant(perm) {
      this.$store.dispatch("policyService/saveGrantPermission", {
        id: this.policyId,
        perm: perm
      });
      this.editGrantGroup = null;
    }
  }
};
</script>

<style scoped>
sui-grid {
  height: 100%;
  width: 100%;
}

.cellTable {
  max-width: 25px !important;
}

.btnTable {
  position: absolute;
  top: 10% !important;
  left: 0;
}
.btnCreate {
  position: absolute;
  top: 30% !important;
  left: 0;
}
</style>
