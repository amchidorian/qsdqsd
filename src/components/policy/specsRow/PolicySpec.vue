<template>
  <div class="md-layout md-gutter">
    <div
      v-if="updateMode"
      class="md-layout-item 
      md-size-50
      md-small-size-100
      md-xsmall-size-100
      left-divider"
    >
      <md-list class="md-dense">
        <draggable
          v-if="set.length > 0"
          class="list-group dragReciever lists"
          :list="set"
          :group="type"
          @change="log"
        >
          <Lock
            v-for="(app, index) in set"
            :key="index"
            :policy-option="app"
            :display-infos-sup="displayInfosSup"
          />
        </draggable>

        <draggable
          v-else
          class="list-group dragReciever lists"
          :list="set"
          :group="type"
          @change="log"
        >
          <md-empty-state
            md-label="Aucune Restriction Vérouillé"
            md-description="Pour en définir, il suffit de déplacer les restrictions dans cette partie."
          />
        </draggable>
      </md-list>
    </div>
    <div
      v-else
      class="md-layout-item 
      md-size-50
      md-small-size-100
      md-xsmall-size-100
      left-divider"
    >
      <md-list
        v-if="set.length > 0"
        class="md-dense lists"
      >
        <Lock
          v-for="(app, index) in set"
          :key="index"
          :policy-option="app"
          :display-infos-sup="displayInfosSup"
        />
      </md-list>
      <md-empty-state
        v-else
        md-label="Aucune Restriction Vérouillé"
        md-description="Pour en définir, il suffit de déplacer les restrictions dans cette partie, en mode édition."
      />
    </div>
    <div
      v-if="updateMode"
      class="md-layout-item 
      md-size-50
      md-small-size-100
      md-xsmall-size-100
      left-divider"
    >
      <md-list class="md-dense">
        <draggable
          v-if="unset.length > 0 && unset != undefined"
          class="list-group dragReciever lists"
          :list="unset"
          :group="type"
          @change="log"
        >
          <div
            v-for="(app, index) in unset"
            :key="index"
          >
            <Lock
              :policy-option="app"
              :display-infos-sup="displayInfosSup"
            />
          </div>
        </draggable>
        <draggable
          v-else
          class="list-group dragReciever lists"
          :list="unset"
          :group="type"
          @change="log"
        >
          <md-empty-state
            md-label="Aucune Restriction Libre"
            md-description="Pour en définir, il suffit de déplacer les restrictions dans cette partie."
          />
        </draggable>
      </md-list>
    </div>
    <div
      v-else
      class="md-layout-item 
      md-size-50
      md-small-size-100
      md-xsmall-size-100
      left-divider"
    >
      <md-list
        v-if="unset.length > 0"
        class="md-dense lists"
      >
        <div
          v-for="(app, index) in unset"
          :key="index"
        >
          <Lock
            :policy-option="app"
            :display-infos-sup="displayInfosSup"
          />
        </div>
      </md-list>
      <md-list
        v-else
        class="md-dense lists"
      >
        <md-empty-state
          md-label="Aucune Restriction Libre"
          md-description="Pour en définir, il suffit de déplacer les restrictions dans cette partie."
        />
      </md-list>
    </div>
    <div
      v-if="updateMode"
      class="md-layout-item md-layout md-gutter
      md-size-100"
    >
      <div
        class="md-layout-item 
      md-size-25
      md-small-size-15
      md-xsmall-size-5"
      />
      <div
        class="md-layout-item 
      md-size-50
      md-small-size-100
      md-xsmall-size-100"
        style="margin-left:20px;"
      >
        <md-field
          v-for="(input, index) in policy.input"
          :key="index"
          style="margin:0; min-height:32px!important;"
        >
          <md-tooltip md-direction="right">
            {{ input.infoSup }}
          </md-tooltip>
          <label>{{ input.fr }}</label>
          <md-input
            v-model="input.value"
            :placeholder="input.fr"
            :type="input.type"
            style="width:100%"
          />
        </md-field>
      </div>
      <div
        class="md-layout-item 
      md-size-25
      md-small-size-15
      md-xsmall-size-5"
      />
      <div
        class="md-layout-item 
      md-size-50
      md-small-size-70
      md-xsmall-size-90"
        style="margin-left:20px;"
      >
        <md-field
          v-for="(drop, index) in policy.drop"
          :key="index"
        >
          <md-tooltip md-direction="left">
            {{ drop.infoSup }}
          </md-tooltip>
          <label>{{ drop.fr }}</label>
          <md-select v-model="drop.value">
            <md-option
              v-for="(enume, index) in drop.enum"
              :key="index"
              :value="enume.value"
            >
              {{ enume.text }}
            </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div
      v-else
      class="md-layout-item md-layout md-gutter
      md-size-100"
    >
      <div
        v-if="policy.input"
        class="md-layout-item  md-layout md-gutter
      md-size-100"
        style="margin-left:20px;"
      >
        <div
          class="md-layout-item 
      md-size-25
      md-small-size-15
      md-xsmall-size-5"
        />

        <div
          class="md-layout-item 
      md-size-50
      md-small-size-70
      md-xsmall-size-90"
        >
          <md-field
            v-for="(inpute, index) in policy.input"
            :key="index"
            style="margin:0; min-height:32px!important;"
          >
            <md-tooltip md-direction="right">
              {{ inpute.infoSup }}
            </md-tooltip>
            <label>{{ inpute.fr }}</label>
            <md-input
              v-model="inpute.value"
              :type="inpute.type"
              style="width:100%"
              disabled
            />
          </md-field>
        </div>
        <div
          class="md-layout-item 
      md-size-25
      md-small-size-15
      md-xsmall-size-5"
        />
      </div>
      <div
        v-if="policy.drop"
        class="md-layout-item  md-layout md-gutter
      md-size-100"
      >
        <div
          class="md-layout-item 
      md-size-25
      md-small-size-15
      md-xsmall-size-5"
        />
        <div
          class="md-layout-item 
      md-size-50
      md-small-size-70
      md-xsmall-size-90"
        >
          <md-field
            v-for="(drop, index) in policy.drop"
            :key="index"
          >
            <md-tooltip md-direction="right">
              {{ drop.infoSup }}
            </md-tooltip>
            <label>{{ drop.fr }}</label>
            <md-input
              :value="getTraduction(drop)"
              style="width:100%"
              disabled
            />
          </md-field>
        </div>
        <div
          class="md-layout-item 
      md-size-25
      md-small-size-15
      md-xsmall-size-5"
        />
      </div>
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
  computed: {
    set() {
      var dataSet = [];
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
  watch: {
    "policy.drop": {
      handler: function(val) {
        for (var drop in val) {
          val[drop].updated = true;
        }
      },
      deep: true
    },
    "policy.input": {
      handler: function(val) {
        for (var input in val) {
          val[input].updated = true;
        }
      },
      deep: true
    }
  },
  beforeCreate() {},
  methods: {
    log: function(evt) {
      if (Object.keys(evt)[0] === "added") {
        evt.added.element.value = !evt.added.element.value;
        evt.added.element.updated = !evt.added.element.updated;
      }
    },
    getTraduction(drop) {
      for (var i in drop.enum) {
        if (drop.value == drop.enum[i].value) {
          return drop.enum[i].text;
        }
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
