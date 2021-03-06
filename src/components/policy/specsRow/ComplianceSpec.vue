<template>
  <div>
    <p>
      Les règles de conformités permettent d'effectuer une action (Bloquer et
      Réinitialiser l'appareil) sur tous les appareils ne respectant pas une
      règle de la Restriction associé.
    </p>
    <md-table
      md-card
      md-dense
      style="overflow:scroll!important"
    >
      <md-table-row>
        <md-table-head>Nom de la règle: </md-table-head>
        <md-table-head>Jours avant blocage</md-table-head>
        <md-table-head>Jours avant reset</md-table-head>
        <md-table-head />
        <md-table-head />
      </md-table-row>
      <md-table-row
        v-for="(compliance, index) in compliances"
        :key="index"
      >
        <md-table-cell>
          {{ getTraduction(compliance.settingName) }}
        </md-table-cell>
        <md-table-cell v-if="updateIndex === index">
          <md-field :class="[{ 'md-invalid': error.day }]">
            <md-input
              v-model="updateData.block"
              :placeholder="compliance.blockAction.blockAfterDays + ' jours'"
              @click="cancelError('day')"
            />
            <span
              v-if="error.day"
              class="md-error"
            >Doit être inférieur au reset</span>
          </md-field>
        </md-table-cell>
        <md-table-cell
          v-else
        >
          {{ compliance.blockAction.blockAfterDays }} jours
        </md-table-cell>
        <md-table-cell v-if="updateIndex === index">
          <md-field :class="[{ 'md-invalid': error.day }]">
            <md-input
              v-model="updateData.wipe"
              :placeholder="compliance.wipeAction.wipeAfterDays + ' jours'"
              @click="cancelError('day')"
            />
            <span
              v-if="error.day"
              class="md-error"
            >Doit être supérieur au blocage</span>
          </md-field>
        </md-table-cell>
        <md-table-cell
          v-else
        >
          {{ compliance.wipeAction.wipeAfterDays }} jours
        </md-table-cell>
        <md-table-cell class="cellTable">
          <md-button
            v-if="updateIndex != index && updateIndex == null && !createMode"
            class="md-icon-button btnTable"
            @click="updateMode(index)"
          >
            <md-icon>edit</md-icon>
          </md-button>
          <md-button
            v-if="updateIndex == index"
            style="color:green"
            class="md-icon-button btnCreate"
            @click="validUpdate(index)"
          >
            <md-icon style="color:green">
              check
            </md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell class="cellTable">
          <md-button
            v-if="updateIndex != index && updateIndex == null && !createMode"
            class="md-icon-button btnTable"
            @click="deleteCompliance(compliance.settingName)"
          >
            <md-icon>delete</md-icon>
          </md-button>
          <md-button
            v-if="updateIndex == index"
            style="color:red"
            class="md-icon-button btnCreate"
            @click="cancelUpdate()"
          >
            <md-icon style="color:red">
              cancel
            </md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>

      <md-table-row v-if="createMode">
        <md-table-cell>
          <md-field :class="[{ 'md-invalid': error.name }]">
            <label>Règle : </label>
            <md-select
              v-model="newCompliance.settingName"
              md-dense
              @click="cancelError('name')"
            >
              <md-option
                v-for="(c, i) in unsetCompliances"
                :key="i"
                :value="c.value"
              >
                {{ c.text }}
              </md-option>
            </md-select>
            <span class="md-error">Ce champs est requis</span>
          </md-field>
        </md-table-cell>
        <md-table-cell>
          <md-field
            style="max-width=20px!important
            "
            :class="[{ 'md-invalid': error.block || error.day }]"
          >
            <label>Jours avant blocage</label>
            <md-input
              v-model="newCompliance.block"
              @click="cancelError('block')"
            />
            <span
              v-if="error.block"
              class="md-error"
            >Ce champs est requis</span>
            <span
              v-if="error.day"
              class="md-error"
            >Doit être inférieur au reset</span>
          </md-field>
        </md-table-cell>
        <md-table-cell>
          <md-field :class="[{ 'md-invalid': error.wipe || error.day }]">
            <label>Jours avant reset</label>
            <md-input
              v-model="newCompliance.wipe"
              @click="cancelError('wipe')"
            />
            <span
              v-if="error.wipe"
              class="md-error"
            >Ce champs est requis</span>
            <span
              v-if="error.day"
              class="md-error"
            >Doit être supérieur au blocage</span>
          </md-field>
        </md-table-cell>
        <md-table-cell class="cellTable">
          <md-button
            style="color:green;"
            class="md-icon-button btnCreate"
            @click="saveCompliance()"
          >
            <md-icon style="color:green">
              check
            </md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell class="cellTable">
          <md-button
            class="md-icon-button btnCreate"
            style="color:red"
            @click="cancelCreate()"
          >
            <md-icon style="color:red">
              cancel
            </md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
      <md-table-row v-if="!createMode">
        <md-table-cell />
        <md-table-cell />
        <md-table-cell />
        <md-table-cell />
        <md-table-cell class="cellTable">
          <md-button
            class="md-icon-button btnTable"
            @click="createMode = true"
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
  name: "ComplianceSpec",
  components: {},
  props: {
    compliances: {
      type: Array,
      default: function() {
        return [];
      }
    },
    policy: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      savedCompliances: false,
      creationMode: false,
      updateIndex: null,
      createMode: false,
      updateComplianceName: false,
      setCompliances: [],
      unsetCompliances: [],
      newCompliance: {
        settingName: "",
        block: "",
        wipe: ""
      },
      updateData: {
        settingName: "",
        block: "",
        wipe: ""
      },
      error: {
        day: false,
        name: false,
        block: false,
        wipe: false
      },
      policyId: null
    };
  },
  computed: {
  },
  watch: {},
  beforeCreate() {},
  created() {
    if (this.compliances.length > 0) {
      this.savedCompliances = true;
      for (var i in this.compliances) {
        this.setCompliances.push(this.compliances[i].settingName);
      }
    }
    this.dropdownOptions();
    this.policyId = this.$router.history.current.params.id;
  },
  methods: {
    cancelError(errorName) {
      if (errorName === "name") {
        this.error.name = false;
      } else if (errorName === "block") {
        this.error.block = false;
        this.error.day = false;
      } else if (errorName === "wipe") {
        this.error.wipe = false;
        this.error.day = false;
      }
    },
    getTraduction(name) {
      var trad = "";
      this.policy.forEach(p => {
        for (var i in p) {
          for (var key in p[i]) {
            if (key === name) {
              trad = p[i][key].fr;
            }
          }
        }
      });
      return trad;
    },
    dropdownOptions() {
      this.policy.forEach(p => {
        for (var i in p) {
          this.extractData(p[i]);
        }
      });
    },
    cancelUpdate() {
      document.getElementById("refreshGroupeBtn").click();
      this.updateIndex = null;
    },
    updateMode(index) {
      this.updateIndex = index;
    },
    extractData(rules) {
      for (var key in rules) {
        if (!this.setCompliances.includes(key)) {
          this.unsetCompliances.push({ text: rules[key].fr, value: key });
        }
      }
    },
    deleteCompliance(complianceName) {
      groupeService
        .deleteCompliance({
          id: this.policyId,
          name: complianceName
        })
        .then(res => {
          document.getElementById("refreshGroupeBtn").click();
        });
    },
    cancelCreate() {
      this.newCompliance = {
        settingName: "",
        block: "",
        wipe: ""
      };
      this.resetError();
      this.creationMode = false;
    },
    resetData() {
      this.newCompliance = {
        settingName: "",
        block: "",
        wipe: ""
      };
      this.error = {
        day: false,
        name: false,
        block: false,
        wipe: false
      };
    },
    resetError() {
      this.error = {
        day: false,
        name: false,
        block: false,
        wipe: false
      };
    },
    validUpdate(index) {
      this.updateData.settingName = this.compliances[index].settingName;
      this.updateData.block =
        this.updateData.block === ""
          ? this.compliances[index].blockAction.blockAfterDays
          : this.updateData.block;
      this.updateData.wipe =
        this.updateData.wipe === ""
          ? this.compliances[index].wipeAction.wipeAfterDays
          : this.updateData.wipe;
      if (this.updateData.block < this.updateData.wipe) {
        groupeService
          .updateCompliance({
            id: this.policyId,
            compliance: this.updateData
          })
          .then(res => {
            document.getElementById("refreshGroupeBtn").click();
          });
        this.updateIndex = null;
        this.resetData();
      } else {
        this.error.day = true;
      }
    },
    saveCompliance() {
      var errorDetected = false;
      for (var i in this.newCompliance) {
        if (this.newCompliance[i] === "") {
          errorDetected = true;
          if (i === "settingName") {
            this.error.name = true;
          } else if (i === "block") {
            this.error.block = true;
          } else if (i === "wipe") {
            this.error.wipe = true;
          }
        }
      }
      if (
        this.newCompliance.block >= this.newCompliance.wipe &&
        !this.error.block &&
        !this.error.wipe
      ) {
        this.error.day = true;
        errorDetected = true;
      }
      if (!errorDetected) {
        groupeService
          .createCompliance({
            id: this.policyId,
            compliance: this.newCompliance
          })
          .then(res => {
            document.getElementById("refreshGroupeBtn").click();
          });
        this.createMode = false;
        this.resetData();
      }
    }
  }
};
</script>

<style scoped>
sui-grid {
  height: 100%;
  width: 100%;
}

.passwordBtn {
  position: absolute !important;
  right: 0 !important;
  margin-top: -15px !important;
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
/* width */
::-webkit-scrollbar {
  width: 5px !important;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1 !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888 !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555 !important;
}
</style>
