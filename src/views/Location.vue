<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout row wrap>
    <v-layout
      v-if="loading"
      align-center
      justify-center
      fill-height
      class="pb-2"
    >
      <v-progress-circular
        :size="50"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </v-layout>

    <div class="w-100">
      <div>
        <v-toolbar tabs class="toolbar">
          <div class="w-60">
            <div class="font-weight-bold text-gray font-size">
              Total users: {{ users.length }}
            </div>
            <div class="font-weight-bold text-gray font-size">
              At floor: {{ currentFloorUsers.length }}
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
            v-model="search"
          ></v-text-field>
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
                <v-img id="imgMap" :src="floor.image.src" class="grey darken-4">
                  <div
                    v-for="(user, index) in currentFloorUsers"
                    :key="user.id"
                    class="pin-associated"
                    :style="setStyles(user.styles.x, user.styles.y, index)"
                    @click="chooseUser(user)"
                  ></div>
                  <div v-if="currentFloor">
                    <div
                      v-for="endPoint in accessPoints"
                      :key="endPoint.id"
                      class="endpoint"
                      :style="
                        setStyles(
                          relativeX(endPoint.mapCoordinates.x),
                          relativeY(endPoint.mapCoordinates.y),
                          -1
                        )
                      "
                    ></div>
                  </div>
                </v-img>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <h4 class="pl-3 text-gray">Choose user to get more information</h4>
      </div>
      <v-list>
        <v-list-tile v-for="item in currentFloorUsers" :key="item.title" avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.macAddress"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <div class="text-xs-center">
        <v-bottom-sheet v-model="sheet">
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
              <v-list-tile-title>
                <span class="font-weight-bold">{{ tile.title }} </span>
                <span>{{ tile.value }}</span>
              </v-list-tile-title>
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
      interval: null,
      mapWidth: 0,
      mapHeight: 0,
      tab: null,
      users: [],
      user: null,
      floors: null,
      maps: [],
      imageURL: null,
      search: "",
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
      if (this.floors[this.tab]) {
        return this.floors[this.tab].accessPoints;
      } else {
        return [];
      }
    },
    currentFloor() {
      return this.floors[this.tab];
    },
    currentFloorUsers() {
      // let result = [];
      // let users = this.users;
      return this.users
        .filter(u => u.macAddress.includes(this.search))
        .filter(u => u.mapInfo.floorRefId === this.currentFloor.aesUidString)
        .map(u => {
          u.styles = {};
          u.styles.x = this.relativeX(u.mapCoordinate.x);
          u.styles.y = this.relativeY(u.mapCoordinate.y);
          return u;
        });
    },
    loading() {
      return !this.maps.length || !this.users.length;
    }
  },
  methods: {
    async getMaps() {
      this.maps = await api.getAllMaps();
      if (this.maps.length) {
        this.floors = this.maps[0].value;
      }
    },
    async getUsers(first) {
      const users = await api.getUsers();
      for (const nUser of users) {
        let newUser = true;
        for (const oUser of this.users) {
          if (oUser.macAddress === nUser.macAddress) {
            newUser = false;
          }
        }
        if (newUser && !first) {
          this.$notify({
            group: "http",
            type: "info",
            title: "New User!",
            text: `"Hi, mac: 00:00:2a:01:00:06 now is on the ${
              nUser.mapInfo.mapHierarchyString
            }"`
          });
        }
      }
      this.users = users;
    },
    relativeX: function(x) {
      let map = document.getElementById("imgMap");
      if (!map) {
        return 0;
      }
      const mapW = map.offsetWidth;
      let relative = (mapW * x) / this.currentFloor.dimension.width / mapW;
      return relative * 100;
    },
    relativeY: function(y) {
      let map = document.getElementById("imgMap");
      if (!map) {
        return 0;
      }
      const mapH = map.offsetHeight;
      let relative = (mapH * y) / this.currentFloor.dimension.length / mapH;
      return relative * 100;
    },
    setStyles(x, y, index) {
      let styles = {};
      if (index === 4) {
        styles = {
          left: x + "%",
          top: y + "%",
          backgroundColor: "red",
          boxShadow:
            "0 0 10px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.7)",
          opacity: 1,
          zIndex: 100
        };
      } else {
        styles = {
          left: x + "%",
          top: y + "%"
        };
      }
      return styles;
    },
    chooseUser(user) {
      this.user = user;
      this.sheet = true;
      this.setTileData();
      console.log(user);
    }
  },

  setTileData() {
    this.tiles[0].value = this.user.apMacAddress;
  },

  async mounted() {
    await this.getMaps();
    await this.getUsers(true);
    this.interval = setInterval(() => {
      this.getUsers();
    }, 6000);
  },
  destroyed() {
    clearInterval(this.interval);
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
.pin-associated {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: gray;
  opacity: 0.9;
}

.pin-associated:after {
  position: absolute;
  width: 12px;
  height: 12px;
  content: "";
  margin: 4px 0 0 4px;
  background: #000080;
  opacity: 0.8;
  border-radius: 50%;
}

.endpoint {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #7cfc00;
}

.endpoint:after {
  position: absolute;
  width: 12px;
  height: 12px;
  content: "";
  margin: 4px 0 0 4px;
  background: black;
}
</style>
