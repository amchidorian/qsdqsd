<template>
  <div style="padding-top:20px;">
    <div class="md-layout md-gutter">
      <div
        class="md-layout-item  md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100"
        style="margin-bottom: 20px;"
      >
        <AddPolicy style="height:100%" />
      </div>
      <div
        class="md-layout-item  md-size-20 md-medium-size-25 md-small-size-50 md-xsmall-size-100 columnPolicies"
        v-for="(policy, index) in policies"
        :key="index"
      >
        <PoliciesPolicyCard :policy="policy" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PoliciesPolicyCard from "../components/cards/PoliciesPolicyCard";
import AddPolicy from "../components/dialogs/policies/AddPolicy";
export default {
  name: "Policies",
  components: { PoliciesPolicyCard, AddPolicy },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      policies: "policiesService/get_policies"
    })
  },
  beforeCreate() {
    this.$store.dispatch("policiesService/getPolicies");
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
