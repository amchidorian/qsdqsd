<template>
  <div>
    Je suis une entreprise
  </div>
</template>

<script>
export default {
  name: "Entreprises",
  components: {},
  data() {
    return {};
  },
  computed: {
  },
  watch: {
    // searchByPolValue() {
    //   this.$emit("updateRestri", [this.policyOption, this.inputVal, this.tab]);
    // },
  },
  beforeCreate() {},
  methods: {
    // updateDevices() {
    //   this.$store.dispatch("deviceService/getDevices");
    // }
  }
};
</script>

<style>
.deviceDetails {
  text-align: left;
  margin-left: 20px;
}
.columnDevices {
  margin-bottom: 20px;
}
.detailsData {
  text-align: left;
}
.detailsTitle {
  margin-top: 5px;
}
.test {
  width: auto;
}

.custom-block.warning {
  background-color: rgba(255, 229, 100, 0.3);
  border-color: #e7c000;
  color: #6b5900;
}
</style>
