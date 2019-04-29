import axios from "axios";

const HTTP = axios.create({
  baseURL: "https://cmxlocationsandbox.cisco.com/api", // http://cisco-presence.unit.ua/api
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json; charset=UTF-8",
    Authorization:
      "Basic " + new Buffer("learning" + ":" + "learning").toString("base64") // "RO" + ":" + "Passw0rd"
  },
  crossdomain: true,
  withCredentials: false
});

export default {
  async getMaps() {
    const url = "/config/v1/maps";
    const response = await HTTP.get(url);
    const campuses = response.data.campuses;
    const maps = {};
    for (let i = 0; i < campuses.length; i++) {
      if (campuses[i].buildingList.length > 0) {
        maps.push({
          floors: campuses.buildingList[i].floorList,
          name: campuses.buildingList[i].hierarchyName
        });
        i++;
      }
    }
    for (let i = 0; i < maps[0].floors.length; i++) {
      maps[0].floors[i].image = await this.getFloorImage(maps[0].floors[i]);
    }
    return maps;
  },

  async getFloorImage(floor) {
    const url = "/config/v1/maps/imagesource/";
    const response = await HTTP.get(url + floor.image.imageName, {
      responseType: "arraybuffer"
    });
    const floorImg = {};
    let imageType = response.headers["content-type"];
    let base64 = new Buffer(response.data).toString("base64");
    let dataURI = "data:" + imageType + ";base64," + base64;
    floorImg.push({
      imageData: dataURI,
      info: floor
    });
    // res.floors.sort((a, b) => {
    //   return a.info.floorNumber - b.info.floorNumber;
    // });
    // if (res.floors.length === floorsLength) {
    // self.showMap(res.floors[0]);
    // }
    return floorImg;
  }
};
