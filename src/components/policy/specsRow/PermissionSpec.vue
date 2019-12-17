<template>
  <div>
    <p>
      Les permissions permettent d'autoriser ou refuser les demandes d'accès aux
      fonctionnalités émise par les applications.
    </p>
    <div class="md-layout md-gutter">
      <div
        class="md-layout-item md-size-25  md-medium-size-20 md-small-size-15 md-xsmall-size-5"
      />
      <div
        class="md-layout-item md-size-50 md-medium-size-60 md-small-size-70 md-xsmall-size-90"
      >
        <md-field>
          <label for="movie">
            Les demandes d'accès émissent par les applications sont :</label>
          <md-select
            id="movie"
            v-model="globalPerm.value"
            name="movie"
          >
            <md-option value="GRANT">
              automatiquement acceptées
            </md-option>
            <md-option value="DENY">
              automatiquement refusées
            </md-option>
            <md-option
              value="PROMPT"
            >
              gérer au cas par cas par l'utilisateur
            </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <md-table>
      <md-table-row>
        <md-table-head>Nom de la permission</md-table-head>
        <md-table-head>Action</md-table-head>
        <md-table-head />
        <md-table-head v-if="creationMode" />
      </md-table-row>

      <md-table-row
        v-for="(perm, index) in setPermissionGroupGrant"
        :key="index"
      >
        <md-table-cell>{{ perm.text }}</md-table-cell>
        <md-table-cell v-if="editGrantGroup == index">
          <md-field>
            <md-select
              id="movie"
              v-model="perm.value"
              name="movie"
            >
              <md-option value="GRANT">
                automatiquement acceptées
              </md-option>
              <md-option value="DENY">
                automatiquement refusées
              </md-option>
              <md-option value="PROMPT">
                gérer par l'utilisateur
              </md-option>
            </md-select>
          </md-field>
        </md-table-cell>
        <md-table-cell v-else>
          {{ getPermValueTraduction(perm.value) }}
        </md-table-cell>
        <md-table-cell v-if="creationMode" />
        <md-table-cell
          v-if="editGrantGroup == index"
          class="cellTable"
        >
          <md-button
            class="md-icon-button btnCreate"
            @click="saveUpdatedGrant(perm)"
          >
            <md-icon>check</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell
          v-else
          class="cellTable"
        >
          <md-button
            class="md-icon-button btnTable"
            @click="editGrantGroup = index"
          >
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell
          v-if="editGrantGroup == index"
          class="cellTable"
        >
          <md-button class="md-icon-button btnCreate">
            <md-icon>cancel</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>
          <md-field v-if="creationMode">
            <label>Permission</label>
            <md-select
              v-model="newGrantPerm.permission"
              md-dense
            >
              <md-option
                v-for="(perm, index) in unsetPermissionGroupGrant"
                :key="index"
                :value="perm.value"
              >
                {{ perm.text }}
              </md-option>
            </md-select>
          </md-field>
        </md-table-cell>
        <md-table-cell>
          <md-field v-if="creationMode">
            <label>Action</label>
            <md-select
              v-model="newGrantPerm.value"
              md-dense
            >
              <md-option value="GRANT">
                Automatiquement validée
              </md-option>
              <md-option value="DENY">
                Automatiquement refusée
              </md-option>
              <md-option value="PROMPT">
                Gérer par l'utilisateur
              </md-option>
            </md-select>
          </md-field>
        </md-table-cell>
        <md-table-cell v-if="creationMode">
          <md-button
            style="color:green;"
            class="md-icon-button btnCreate"
            @click="savePermission()"
          >
            <md-icon style="color:green;">
              check
            </md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell>
          <md-button
            v-if="creationMode"
            style="color:red;"
            class="md-icon-button btnCreate"
            @click="cancelCreate()"
          >
            <md-icon style="color:red;">
              cancel
            </md-icon>
          </md-button>
          <md-button
            v-if="!creationMode"
            class="md-icon-button btnTable"
            @click="creationMode = true"
          >
            <md-icon>add</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { groupeService } from "../../../_services/groupe.service";
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
      groupeService
        .updatePolicyPermission({
          id: this.policyId,
          perm: this.globalPerm.value
        })
        .then(res => {
          console.log("groupeService updatePolicyPermission");

          document.getElementById("refreshGroupeBtn").click();
        });
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
    validGlobalUpdate() {
      groupeService
        .updatePolicyPermission({
          id: this.policyId,
          perm: this.globalPerm.value
        })
        .then(res => {
          console.log("groupeService updatePolicyPermission");

          document.getElementById("refreshGroupeBtn").click();
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
      console.log(this.newGrantPerm);
      if (
        this.newGrantPerm.permission == null ||
        this.newGrantPerm.value == null
      ) {
        console.log("error");
      } else {
        groupeService
          .saveGrantPermission({
            id: this.policyId,
            perm: this.globalPerm.value
          })
          .then(res => {
            console.log("groupeService updatePolicyPermission");

            document.getElementById("refreshGroupeBtn").click();
          });
        this.creationMode = false;
      }
    },
    saveUpdatedGrant(perm) {
      groupeService
        .saveGrantPermission({
          id: this.policyId,
          perm: this.globalPerm.value
        })
        .then(res => {
          console.log("groupeService updatePolicyPermission");

          document.getElementById("refreshGroupeBtn").click();
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
