<!--<template>-->
<!--<div>-->
<!--<v-layout align-center justify-end row>-->
<!--<v-flex xs9>-->
<!--<v-btn-->
<!--v-for="(floor, index) in floors"-->
<!--:key="index"-->
<!--fab-->
<!--small-->
<!--dark-->
<!--@click="showFloor(floor)"-->
<!--&gt;-->
<!--{{ floor.data.floorNumber }}-->
<!--</v-btn>-->
<!--</v-flex>-->
<!--<v-flex xs3>-->
<!--<v-text-field-->
<!--class="mx-3"-->
<!--flat-->
<!--label="Search by MAC"-->
<!--prepend-inner-icon="search"-->
<!--v-model="MacAdress"-->
<!--@keyup.enter="getSearchedMac(MacAdress)"-->
<!--&gt;</v-text-field>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<div class="total-users">-->
<!--<span>Total users: {{ users.length }}</span>-->
<!--<span>|</span>-->
<!--<span>At floor: {{ currentFloorUsers.length }}</span>-->
<!--</div>-->
<!--<div class="map-location">-->
<!--<img id="map" :src="imageURL" />-->
<!--<div-->
<!--v-for="(user, index) in currentFloorUsers"-->
<!--:key="index"-->
<!--:class="{-->
<!--'pin-associated': user.associated === true,-->
<!--'pin-unassociated': user.associated !== true-->
<!--}"-->
<!--:style="setStyles(user.styles.x, user.styles.y, index)"-->
<!--@click="showModalUser(user, index)"-->
<!--&gt;</div>-->
<!--</div>-->
<!--<p>Choose user to get more information</p>-->
<!--<div class="users">-->
<!--<v-btn-->
<!--large-->
<!--class="user"-->
<!--v-for="(user, index) in currentFloorUsers"-->
<!--:key="index"-->
<!--@click="showModalUser(user, index)"-->
<!--&gt;-->
<!--{{ user.deviceId }}-->
<!--</v-btn>-->
<!--</div>-->
<!--<div class="text-center" v-if="currentUser">-->
<!--<v-dialog v-model="dialogUser" width="500">-->
<!--<v-card>-->
<!--<v-card-title class="headline grey lighten-2" primary-title>-->
<!--User Info-->
<!--</v-card-title>-->

<!--<v-card-text>-->
<!--<v-container>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>MAC Address:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>{{ currentUser.deviceId }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>Status:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p v-if="currentUser.associated">Associated</p>-->
<!--<p v-else-if="!currentUser.associated">Not Associated</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>IP Addresses:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p v-for="ip in currentUser.ipAddress">{{ ip }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>Co-ordinates:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p v-if="currentUser.locationCoordinate">-->
<!--X: {{ currentUser.locationCoordinate.x }}-->
<!--</p>-->
<!--<p v-if="currentUser.locationCoordinate">-->
<!--Y: {{ currentUser.locationCoordinate.y }}-->
<!--</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>Compute Type:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>{{ currentUser.locComputeType }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>Last Seen:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>{{ getLastSeenTime(currentUser.lastSeen) }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>Manufacturer:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>{{ currentUser.manufacturer }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>Connected APP:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>{{ currentUser.apMacAddress }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>SSID:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>{{ currentUser.ssid }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>Max RSSI:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p v-if="currentUser.maxDetectedRssi">-->
<!--{{ currentUser.maxDetectedRssi.rssi }}-->
<!--</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row class="modal-info">-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>BAND:</p>-->
<!--</v-flex>-->
<!--<v-flex xs6 order-lg2>-->
<!--<p>{{ currentUser.band }}</p>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-card-actions>-->
<!--<v-spacer></v-spacer>-->
<!--<v-btn large @click="dialogUser = false">-->
<!--Close-->
<!--</v-btn>-->
<!--</v-card-actions>-->
<!--</v-container>-->
<!--</v-card-text>-->
<!--</v-card>-->
<!--</v-dialog>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import HTTP from "../HTTP";-->
<!--import $ from "jquery";-->

<!--export default {-->
<!--name: "location",-->
<!--data() {-->
<!--return {-->
<!--alert: true,-->
<!--currentFloor: null,-->
<!--floors: [],-->
<!--users: [],-->
<!--currentUser: [],-->
<!--dialogUser: false,-->
<!--imageURL: null,-->
<!--floorsInit: [],-->
<!--interval: null,-->
<!--mapHeight: null,-->
<!--mapWidth: null,-->
<!--MacAdress: null,-->
<!--checkedIndex: null,-->
<!--diff: []-->
<!--};-->
<!--},-->
<!--created() {-->
<!--this.getAllFloors();-->
<!--},-->
<!--methods: {-->
<!--getSearchedMac(mac) {-->
<!--HTTP.get("/api/location/v3/clients?macAddress=" + mac)-->
<!--.then(res => {-->
<!--this.currentUser = res.data[0];-->
<!--this.currentUser.checked = !this.currentUser.checked;-->
<!--console.log(this.currentUser);-->
<!--if (!this.currentUser) {-->
<!--this.$message({-->
<!--message: "MAC Address is wrong",-->
<!--type: "error"-->
<!--});-->
<!--}-->
<!--this.dialogUser = true;-->
<!--})-->
<!--.catch(err => {-->
<!--console.log("Error", err);-->
<!--});-->
<!--},-->

<!--getMapSize() {-->
<!--let map = $("#map");-->
<!--this.mapHeight = map.height();-->
<!--this.mapWidth = map.width();-->
<!--},-->
<!--getLastSeenTime(time) {-->
<!--let now = new Date().getTime() / 1000;-->
<!--let result = "";-->
<!--let userDate = new Date(time).getTime() / 1000;-->
<!--let differ = now - userDate;-->
<!--let hours = Math.floor(differ / 3600);-->
<!--if (hours !== 0) {-->
<!--result += hours + "h ";-->
<!--}-->
<!--let minutes = Math.floor((differ % 3600) / 60);-->
<!--if (minutes !== 0) {-->
<!--result += minutes + "m ";-->
<!--}-->
<!--result += Math.floor(differ % 60) + "s ";-->
<!--return result;-->
<!--},-->
<!--getAllFloors: function() {-->
<!--HTTP.get("/api/config/v1/maps")-->
<!--.then(async response => {-->
<!--response.data.campuses.map(campus => {-->
<!--let i = 0;-->
<!--let floors = [];-->
<!--if (campus.buildingList.length > 0) {-->
<!--floors = campus.buildingList[i].floorList;-->
<!--this.floorsInit = floors;-->
<!--}-->
<!--i++;-->
<!--});-->
<!--this.floorsInit.map(async floor => {-->
<!--await this.getFloorMap(floor);-->
<!--});-->
<!--})-->
<!--.catch(error => console.log("ERR", error));-->
<!--},-->
<!--getFloorMap: function(floor) {-->
<!--HTTP.get("/api/config/v1/maps/imagesource/" + floor.image.imageName, {-->
<!--responseType: "arraybuffer"-->
<!--})-->
<!--.then(async res => {-->
<!--let base64 = Buffer.from(res.data).toString("base64");-->
<!--let dataURI =-->
<!--"data:" + res.headers["content-type"] + ";base64," + base64;-->
<!--try {-->
<!--await this.floors.push({-->
<!--imageData: dataURI,-->
<!--data: floor-->
<!--});-->
<!--} catch (e) {-->
<!--console.log("Error", e);-->
<!--}-->

<!--if (this.floors.length === this.floorsInit.length) {-->
<!--try {-->
<!--await this.floors.sort(function(a, b) {-->
<!--return a.data.floorNumber - b.data.floorNumber;-->
<!--});-->
<!--await this.showFloor(this.floors[0]);-->
<!--} catch (e) {-->
<!--console.log("ERROR", e);-->
<!--}-->
<!--}-->
<!--})-->
<!--.catch(err => console.log("ERROR", err));-->
<!--},-->
<!--getAllUsers() {-->
<!--HTTP.get("/api/location/v3/clients")-->
<!--.then(async response => {-->
<!--NProgress.remove();-->
<!--NProgress.configure({ showSpinner: false });-->
<!--let arr = [];-->
<!--arr = response.data;-->
<!--if (this.users.length !== 0) {-->
<!--let user = {-->
<!--deviceId: "test",-->
<!--locationMapHierarchy:-->
<!--"DevNetCampus>DevNetBuilding>DevNetOffice>Lobby"-->
<!--};-->
<!--arr.push(user);-->
<!--this.diff = this.arr_diff(arr);-->
<!--console.log(this.diff);-->
<!--console.log(arr);-->
<!--}-->
<!--if (this.diff.length > 0) {-->
<!--for (let i = 0; i < this.diff.length; i++) {-->
<!--await new Promise(resolve => setTimeout(resolve, 500))-->
<!--.then(-->
<!--this.$notify.info({-->
<!--title: "New user has connected",-->
<!--message:-->
<!--"MAC: " +-->
<!--this.diff[i].deviceId +-->
<!--" now is on the " +-->
<!--this.getCurrentFloorUser(-->
<!--this.diff[i].locationMapHierarchy-->
<!--)-->
<!--})-->
<!--)-->
<!--.catch(err => console.log(err));-->
<!--}-->
<!--}-->
<!--this.users = arr;-->
<!--})-->
<!--.catch(e => {-->
<!--console.log(e);-->
<!--});-->
<!--},-->
<!--getCurrentFloorUser(floorstr) {-->
<!--let floor = floorstr.split(">");-->
<!--console.log(floor);-->
<!--return floor[floor.length - 1];-->
<!--},-->
<!--arr_diff(arr) {-->
<!--let dict = [],-->
<!--result = [];-->
<!--arr.map(el => {-->
<!--dict[el.deviceId] = el;-->
<!--dict.length++;-->
<!--});-->
<!--for (let i = 0; i < this.users.length; i++) {-->
<!--if (dict[this.users[i].deviceId]) {-->
<!--delete dict[this.users[i].deviceId];-->
<!--dict.length = dict.length - 1;-->
<!--}-->
<!--}-->

<!--let tmp = Object.entries(dict);-->
<!--tmp.forEach(el => {-->
<!--result.push(el[1]);-->
<!--});-->
<!--return result;-->
<!--},-->
<!--setStyles(x, y, index) {-->
<!--let styles = {};-->
<!--if (index === this.checkedIndex) {-->
<!--styles = {-->
<!--left: x + "%",-->
<!--top: y + "%",-->
<!--backgroundColor: "red",-->
<!--boxShadow:-->
<!--"0 0 10px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.7)",-->
<!--opacity: 1,-->
<!--zIndex: 100-->
<!--};-->
<!--} else {-->
<!--styles = {-->
<!--left: x + "%",-->
<!--top: y + "%",-->
<!--backgroundColor: "#70f570",-->
<!--boxShadow:-->
<!--"0 0 10px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.7)",-->
<!--opacity: 1,-->
<!--zIndex: 100-->
<!--};-->
<!--}-->
<!--return styles;-->
<!--},-->
<!--getMapX: function(x) {-->
<!--return (-->
<!--((this.mapWidth * x) /-->
<!--this.currentFloor.data.dimension.width /-->
<!--this.mapWidth) *-->
<!--100-->
<!--);-->
<!--},-->
<!--getMapY: function(y) {-->
<!--return (-->
<!--((this.mapHeight * y) /-->
<!--this.currentFloor.data.dimension.length /-->
<!--this.mapHeight) *-->
<!--100-->
<!--);-->
<!--},-->
<!--showFloor: function(floor) {-->
<!--this.currentFloor = floor;-->
<!--this.imageURL = floor.imageData;-->
<!--this.getMapSize();-->
<!--},-->
<!--showModalUser: function(user, index) {-->
<!--HTTP.get("/api/location/v3/clients?macAddress=" + user.deviceId)-->
<!--.then(res => {-->
<!--this.currentUser = res.data[0];-->
<!--this.checkedIndex = index;-->
<!--if (!this.currentUser) {-->
<!--this.$message({-->
<!--message: "Something went wrong. Please try again later.",-->
<!--type: "error"-->
<!--});-->
<!--}-->
<!--this.dialogUser = true;-->
<!--})-->
<!--.catch(err => console.log("ERROR", err));-->
<!--}-->
<!--},-->
<!--watch: {-->
<!--users() {-->
<!--this.showFloor(this.currentFloor);-->
<!--},-->
<!--imageURL(newValue, oldValue) {-->
<!--if (oldValue === null) {-->
<!--this.getAllUsers();-->
<!--clearInterval(this.interval);-->
<!--this.interval = setInterval(() => {-->
<!--this.getAllUsers();-->
<!--}, 50000);-->
<!--}-->
<!--},-->
<!--dialogUser(newValue) {-->
<!--if (newValue === false) this.checkedIndex = null;-->
<!--}-->
<!--},-->
<!--computed: {-->
<!--currentFloorUsers: function() {-->
<!--let result = [];-->
<!--this.users.map(user => {-->
<!--if (user.floorRefId === this.currentFloor.data.aesUidString) {-->
<!--user.styles = {};-->
<!--user.styles.x = this.getMapX(user.locationCoordinate.x);-->
<!--user.styles.y = this.getMapY(user.locationCoordinate.y);-->
<!--user.checked = false;-->
<!--result.push(user);-->
<!--}-->
<!--});-->
<!--return result;-->
<!--}-->
<!--}-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.total-users {-->
<!--text-align: center;-->
<!--font-size: 25px;-->
<!--font-weight: 300;-->
<!--}-->
<!--</style>-->
