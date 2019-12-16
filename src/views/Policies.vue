<template>
  <div style="padding-top:20px;">
    <div class="md-layout md-gutter" v-if="policies.length > 0">
      <div
        class="md-layout-item md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100"
        style="margin-bottom: 20px;"
      >
        <AddPolicy style="height:100%" :type="'notempty'" />
      </div>
      <div
        class="md-layout-item  md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100 columnPolicies"
        v-for="(policy, index) in policies"
        :key="index"
      >
        <PoliciesPolicyCard :policy="policy" />
      </div>
    </div>
    <md-empty-state
      v-if="policies.length == 0"
      md-icon="lock"
      md-label="Aucun Groupe n'a été enregistré."
      md-description="En en enregistrant, vous pourrez les assigné à différents appareils permettant de les restreindre."
    >
      <AddPolicy style="height:100%" :type="'empty'" />
    </md-empty-state>
    <button
      id="refreshGroupesBtn"
      v-on:click="refreshGroupes"
      style="display:none;"
    ></button>
  </div>
</template>

<script>
import { groupesService } from "../_services/groupes.service";
import PoliciesPolicyCard from "../components/cards/PoliciesPolicyCard";
import AddPolicy from "../components/dialogs/policies/AddPolicy";
export default {
  name: "Policies",
  components: { PoliciesPolicyCard, AddPolicy },
  data() {
    return {
      policies: []
    };
  },
  computed: {
  },
  methods: {
    refreshGroupes() {
      groupesService.getGroupes().then(res => (this.policies = res));
    }
  },
  beforeCreate() {
    groupesService.getGroupes().then(res => (this.policies = res));
  },
  openPolicyPage: function(id) {
    this.$router.push("/policy/" + id);
  }
};
</script>

<style>
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
