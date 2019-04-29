<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout row wrap>
    <v-layout
      v-if="loading && !maps.length"
      align-center
      justify-center
      fill-height
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <div v-if="!loading && maps.length" class="w-100">
      <div>
        <v-toolbar tabs class="toolbar">
          <div class="w-60">
            <div class="font-weight-bold text-gray font-size">
              Total users: {{ users.length }}
            </div>
            <div class="font-weight-bold text-gray font-size">
              At floor: {{ users.length }}
            </div>
          </div>
          <v-select :items="maps" v-model="floors" label="Map"></v-select>
          <v-text-field
            append-icon="mic"
            class="mx-3"
            flat
            label="Search by MAC"
            prepend-inner-icon="search"
            solo-inverted
          ></v-text-field>
          <!--        <div-->
          <!--          v-for="endPoint in accessPoints"-->
          <!--          class="endpoint"-->
          <!--          :style="-->
          <!--            setStyles(-->
          <!--              relativeX(endPoint.mapCoordinates.x),-->
          <!--              relativeY(endPoint.mapCoordinates.y),-->
          <!--              -1-->
          <!--            )-->
          <!--          "-->
          <!--        ></div>-->
          <template v-slot:extension v-if="floors">
            <v-tabs
              v-model="tab"
              centered
              color="transparent"
              slider-color="white"
            >
              <v-tab v-for="n in floors.length" :key="n"> Floor {{ n }} </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="floor in floors" :key="floor.floorNumber">
            <v-card>
              <v-card-text>
                <v-img :src="floor.image.src" class="grey darken-4"></v-img>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <h4 class="pl-3 text-gray">Choose user to get more information</h4>
      </div>

      <div class="text-xs-center">
        <v-bottom-sheet v-model="sheet">
          <template v-slot:activator>
            <v-btn color="purple" dark>
              Click me
            </v-btn>
          </template>
          <v-list>
            <v-subheader>ACCESS POINT</v-subheader>
            <v-list-tile
              v-for="tile in tiles"
              :key="tile.title"
              @click="sheet = false"
              class="d-flex xs4"
            >
              <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                  <img src="../../public/img/check.png" :alt="tile.title" />
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title
                ><span class="font-weight-bold">{{ tile.title }}</span>
                {{ tile.value }}</v-list-tile-title
              >
            </v-list-tile>
          </v-list>
        </v-bottom-sheet>
      </div>
    </div>
  </v-layout>
</template>

<script>
import api from "@/api/cmx";

export default {
  name: "location",
  data() {
    return {
      tab: null,
      users: [],
      floors: null,
      maps: [],
      imageURL: null,
      loading: true,

      sheet: false,
      tiles: [
        { title: "MAC Address:", value: "00:2b:01:00:03:00" },
        { title: "Status:", value: "Inactive" },
        {
          title: "Client Information:",
          value: "0 connected clients, 0 detected clients"
        },
        { title: "Co-ordinates:", value: "X: 29.592525, Y: 22.204147" },
        { title: "Name:", value: "T1-2" },
        { title: "Height:", value: "10" },
        { title: "Angles::", value: "Slot 0: 90, Slot 1: 90" },
        { title: "Elevation Angles:", value: "Slot 0: 0, Slot 1: 0" },
        {
          title: "Antenna Pattern:",
          value: "Slot 0: Internal-1140-2.4GHz, Slot 1: Internal-1140-5.0GHz"
        }
      ],

      macAddress: "00:2b:01:00:03:00"
    };
  },
  computed: {
    accessPoints() {
      return this.currentFloor.info.accessPoints;
    }
  },
  methods: {
    async getMaps() {
      this.maps = await api.getAllMaps();
      if (this.maps.length) {
        this.loading = false;
        this.floors = this.maps[0].value;
      }
    },
    async getUsers() {
      this.users = await api.getUsers();
    }
    // setStyles(x, y, index) {
    //   let styles = {};
    //   if (index === this.chosenIndex) {
    //     styles = {
    //       left: x + "%",
    //       top: y + "%",
    //       backgroundColor: "red",
    //       boxShadow:
    //         "0 0 10px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.7)",
    //       opacity: 1,
    //       zIndex: 100
    //     };
    //   } else {
    //     styles = {
    //       left: x + "%",
    //       top: y + "%"
    //     };
    //   }
    //   return styles;
    // },
    // relativeX: function(x) {
    //   let relative =
    //     (this.mapWidth * x) /
    //     this.currentFloor.info.dimension.width /
    //     this.mapWidth;
    //   return relative * 100;
    // },
    // relativeY: function(y) {
    //   let relative =
    //     (this.mapHeight * y) /
    //     this.currentFloor.info.dimension.length /
    //     this.mapHeight;
    //   return relative * 100;
    // }
  },
  async mounted() {
    this.getMaps();
    this.interval = setInterval(() => {
      this.getUsers();
    }, 5000);
  }
};
</script>

<style>
.toolbar .v-toolbar__content {
  margin-left: 0 !important;
}
.w-100 {
  width: 100%;
}
.w-60 {
  width: 60%;
}
</style>
