<template>
  <div>
    <md-card md-with-hover>
      <router-link
        :to="'/policy/' + policy.id"
        style="text-decoration: none; color:black; border:black;"
      >
        <md-ripple>
          <md-card-header>
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
        </md-ripple>
      </router-link>
      <md-card-actions style="border-top: 0.5px solid;">
        <DeletePolicy :policy="policy" />
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import DeletePolicy from "../dialogs/policies/DeletePolicy";

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
