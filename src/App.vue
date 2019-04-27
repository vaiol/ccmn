<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile
          v-for="item in routes"
          :key="item.url"
          @click="$router.push(item.url)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: "CCMN",
      drawer: null,
      routes: [
        {
          icon: "contact_mail",
          text: "Analytics",
          url: "/analytics"
        },
        {
          icon: "map",
          text: "Location",
          url: "/location"
        }
      ]
    };
  }
};
</script>
