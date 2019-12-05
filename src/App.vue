<template>
  <div class="page-container" style=" display:fixed;">
    <md-app style="height:100vh!important;">
      <md-app-toolbar class="md-primary navHeader" md-elevation="0">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{ title }}</span>
      </md-app-toolbar>

      <md-app-drawer
        :md-active.sync="menuVisible"
        md-persistent="mini"
        style="height:94vh!important;"
      >
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Menu</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item @click="navigate('Tous les Appareils', '/devices')">
            <md-icon>phone_android</md-icon>
            <span class="md-list-item-text">Appareils</span>
          </md-list-item>

          <md-list-item
            @click="navigate('Toutes les Restrictions', '/policies')"
          >
            <md-icon>lock</md-icon>
            <span class="md-list-item-text">Restrictions</span>
          </md-list-item>

          <md-list-item
            @click="navigate('Toutes les Applications', '/applications')"
          >
            <md-icon>apps</md-icon>
            <span class="md-list-item-text">Applications</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content class="appContent">
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  data: () => ({
    menuVisible: false,
    title: "Accueil"
  }),
  methods: {
    toggleMenu() {},
    navigate(title, uri) {
      this.$router.push(uri);
      this.title = title;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push("login");
    }
  },
  computed: {
    ...mapGetters({
      isLogged: "authService/get_is_logged"
    })
  },
  watch: {
    isLogged() {
      if (!this.isLogged) {
        this.$router.push({ name: "login" });
      } else if (this.$route.name === "login") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.navHeader {
  position: sticky !important;
  top: 0;
}
.appContent {
  height: 93vh !important;
  top: 0;
  padding: 0;
}
</style>
