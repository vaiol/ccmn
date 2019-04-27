<template>
  <v-app>
    <StyleManager />
    <Toolbar />
    <Drawer />
    <v-content>
      <div id="core-view">
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </div>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import StyleManager from "@/components/core/Filter";
import Drawer from "@/components/core/Drawer";
import Toolbar from "@/components/core/Toolbar";
import Footer from "@/components/core/Footer";

export default {
  components: {
    StyleManager,
    Drawer,
    Toolbar,
    Footer
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";
#core-view {
  padding-bottom: 100px;
}
</style>
