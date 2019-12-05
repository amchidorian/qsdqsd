<template>
  <md-list-item>
    <md-card class="appCard" v-if="installed && !updateMode">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75 appLabel">
          <div class="md-subhead">
            {{ app.name }}
          </div>
        </div>
        <div class="md-layout-item md-size-25">
          <md-avatar>
            <img :src="app.icon" />
          </md-avatar>
        </div>
      </div>
    </md-card>
    <md-card class="appCard" v-else-if="!installed && !updateMode">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75 appLabel">
          <div class="md-subhead">
            {{ app.name }}
          </div>
        </div>
        <div class="md-layout-item md-size-25">
          <md-avatar>
            <img :src="app.icon" />
          </md-avatar>
        </div>
      </div>
    </md-card>
    <md-card class="appCard" md-with-hover v-if="installed && updateMode">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-75 appLabel">
          <div class="md-subhead">
            {{ app.name }}
          </div>
        </div>
        <div class="md-layout-item md-size-25">
          <md-avatar>
            <img :src="app.icon" />
          </md-avatar>
        </div>
      </div>
    </md-card>
    <md-card class="appCard" md-with-hover v-else-if="!installed && updateMode">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-25">
          <md-avatar>
            <img :src="app.icon" />
          </md-avatar>
        </div>
        <div class="md-layout-item md-size-75 appLabel">
          <div class="md-subhead">
            {{ app.name }}
          </div>
        </div>
      </div>
    </md-card>
  </md-list-item>
</template>

<script>
export default {
  name: "PolicyApp",
  components: {},
  props: {
    app: {},
    installed: Boolean,
    updateMode: Boolean
  }
};
</script>

<style>
.appCard {
  width: 100%;
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  margin: 0 !important;
}

.appLabel {
  margin-top: 10px;
  text-align: center !important;
}
</style>
