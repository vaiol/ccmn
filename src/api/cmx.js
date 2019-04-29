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

const getFloorImage = async image => {
  const url = "/config/v1/maps/imagesource/";
  const response = await HTTP.get(url + image, {
    responseType: "arraybuffer"
  });
  let imageType = response.headers["content-type"];
  let base64 = new Buffer(response.data).toString("base64");
  return "data:" + imageType + ";base64," + base64;
};

export default {
  async getAllMaps() {
    const maps = [];
    const response = await HTTP.get("/config/v1/maps");
    for (const campus of response.data.campuses) {
      if (campus.buildingList.length) {
        for (const building of campus.buildingList) {
          const floors = building.floorList;
          for (const f of floors) {
            f.image.src = await getFloorImage(f.image.imageName);
          }
          floors.sort((a, b) => a.floorNumber - b.floorNumber);
          maps.push({
            floors,
            name: building.hierarchyName
          });
        }
      }
    }
    return maps;
  },
  async getUsers() {
    const { data } = await HTTP.get("/location/v2/clients");
    return data;
  }
};
