<template>
  <md-app-toolbar class="md-primary" md-elevation="0">
    <md-button class="md-icon-button" @click="burgerClicked()" v-if="!menuVisible">
      <md-icon>menu</md-icon>
    </md-button>
    <span class="md-title">My Title</span>
  </md-app-toolbar>
</template>

<script>
export default {
  components: {},
  props: {
    menuVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    burgerClicked() {
        console.log("burgerClicked")
      this.$emit("burgerClicked");
    }
  }
};
</script>

<style>
.scrollbar {
  background-color: aqua;
  height: 100% !important;
}
</style>