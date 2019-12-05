<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-15"></div>
    <div class="md-layout-item md-size-35 right-divider" v-if="updateMode">
      <md-list class="md-dense">
        <draggable
          class="list-group dragReciever lists"
          :list="set"
          :group="type"
          @change="log"
        >
          <div v-for="(app, index) in set" v-bind:key="index">
            <Lock :policyOption="app" :displayInfosSup="displayInfosSup" />
          </div>
        </draggable>
      </md-list>
      <div class="md-layout-item md-size-80" v-if="policy.input">
        <md-field
          style="margin:0; min-height:32px!important;"
          v-for="(inpute, index) in policy.input"
          v-bind:key="index"
        >
          <md-tooltip md-direction="right">{{ inpute.infoSup }}</md-tooltip>
          <label>{{ inpute.fr }}</label>
          <md-input
            v-model="inpute.value"
            :placeholder="inpute.fr"
            :type="inpute.type"
            style="width:100%"
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-80" v-if="policy.drop">
        <md-field v-for="(drop, index) in policy.drop" v-bind:key="index">
          <md-tooltip md-direction="left">{{ drop.infoSup }}</md-tooltip>
          <md-select name="country" id="country" :placeholder="drop.fr">
            <md-option
              v-for="(enume, index) in drop.enum"
              v-bind:key="index"
              :value="enume.value"
              >{{ enume.text }}</md-option
            >
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="md-layout-item md-size-35 right-divider" v-else>
      <md-list class="md-dense lists">
        <Lock
          v-for="(app, index) in set"
          v-bind:key="index"
          :policyOption="app"
          :displayInfosSup="displayInfosSup"
        />
      </md-list>

      <div class="md-layout-item md-size-80" v-if="policy.input">
        <md-field
          style="margin:0; min-height:32px!important;"
          v-for="(inpute, index) in policy.input"
          v-bind:key="index"
        >
          <md-tooltip md-direction="right">{{ inpute.infoSup }}</md-tooltip
          >+
          <label>{{ inpute.fr }}</label>
          <md-input
            v-model="inpute.value"
            :type="inpute.type"
            style="width:100%"
            disabled
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-80" v-if="policy.drop">
        <md-field v-for="(drop, index) in policy.drop" v-bind:key="index">
          <md-tooltip md-direction="right">{{ drop.infoSup }}</md-tooltip>
          <label>{{ drop.value }}</label>
          <md-input v-model="drop.fr" style="width:100%" disabled></md-input>
        </md-field>
      </div>
    </div>
    <div class="md-layout-item md-size-35 left-divider" v-if="updateMode">
      <md-list class="md-dense">
        <draggable
          class="list-group dragReciever lists"
          :list="unset"
          :group="type"
          @change="log"
        >
          <div v-for="(app, index) in unset" v-bind:key="index">
            <Lock :policyOption="app" :displayInfosSup="displayInfosSup" />
          </div>
        </draggable>
      </md-list>
    </div>
    <div class="md-layout-item md-size-35 left-divider" v-else>
      <md-list class="md-dense lists">
        <div v-for="(app, index) in unset" v-bind:key="index">
          <Lock :policyOption="app" :displayInfosSup="displayInfosSup" />
        </div>
      </md-list>
    </div>
  </div>
</template>

<script>
import Lock from "../Lock";
import draggable from "vuedraggable";

export default {
  name: "PolicySpec",
  components: { Lock, draggable },
  props: {
    policy: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    displayInfosSup: {
      type: Boolean
    },
    type: {
      type: String
    },
    updateMode: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  beforeCreate() {},
  computed: {
    set() {
      var dataSet = [];
      console.log("this.policy");
      console.log(this.policy);
      for (var p in this.policy.boolean) {
        if (this.policy.boolean[p].value) {
          dataSet.push(this.policy.boolean[p]);
        }
      }
      return dataSet;
    },
    unset() {
      var dataSet = [];
      for (var p in this.policy.boolean) {
        if (!this.policy.boolean[p].value) {
          dataSet.push(this.policy.boolean[p]);
        }
      }
      return dataSet;
    }
  },
  methods: {
    log: function(evt) {
      if (Object.keys(evt)[0] === "added") {
        evt.added.element.value = !evt.added.element.value;
        evt.added.element.updated = !evt.added.element.updated;
      }
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
</style>
