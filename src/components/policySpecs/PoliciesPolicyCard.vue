<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header style="padding-bottom:0px;">
        <div class="md-title">
          {{ policy.name }}
        </div>
        <div class="md-subhead">
          Crée le : {{ policy.date }}
        </div>
        <div class="md-subhead">
          Version {{ policy.version }}
        </div>
      </md-card-header>
      <md-card-actions>
        <DeletePolicy :policy="policy" />
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
import DeletePolicy from "../dialogs/DeletePolicy";

export default {
  name: "PoliciesPolicyCard",
  components: { DeletePolicy },
  props: {
    policy: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
};
</script>

<style>
.deviceDetails {
  text-align: left;
  margin-left: 20px;
}
.detailsData {
  text-align: left;
}
.detailsTitle {
  margin-top: 5px;
}
</style>
