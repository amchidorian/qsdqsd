<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-15"></div>
    <div class="md-layout-item md-size-35" v-if="updateMode">
      <md-list class="md-dense">
        <draggable
          style="min-height:20px"
          class="list-group dragReciever"
          :list="apps.installed"
          :group="type"
          @change="log"
        >
          <div v-for="(app, index) in apps.installed" v-bind:key="index">
            <PolicyApp :app="app" :updatable="false" />
          </div>
        </draggable>
      </md-list>
    </div>
    <div class="md-layout-item md-size-35" v-else>
      <md-list class="md-dense">
        <PolicyApp
          v-for="(app, index) in apps.installed"
          v-bind:key="index"
          :app="app"
          :updatable="false"
        />
      </md-list>
    </div>
    <div class="md-layout-item md-size-35" v-if="updateMode">
      <md-list class="md-dense">
        <draggable
          style="min-height:20px"
          class="list-group dragReciever"
          :list="apps.available"
          :group="type"
          @change="log"
        >
          <div v-for="(app, index) in apps.available" v-bind:key="index">
            <PolicyApp :app="app" :updatable="false" />
          </div>
        </draggable>
      </md-list>
    </div>
    <div class="md-layout-item md-size-35" v-else>
      <md-list class="md-dense">
        <div v-for="(app, index) in apps.available" v-bind:key="index">
          <PolicyApp :app="app" :updatable="false" />
        </div>
      </md-list>
    </div>
  </div>
</template>

<script>
import PolicyApp from "../PolicyApp";
import draggable from "vuedraggable";

export default {
  name: "ApplicationSpec",
  components: { PolicyApp, draggable },
  props: {
    apps: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    updateMode: {
      type: Boolean
    },
    type: {
      type: String
    }
  },
  data() {
    return {};
  },
  beforeCreate() {},
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

.deviceDetails {
  text-align: left;
  margin-left: 20px;
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
