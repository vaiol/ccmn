export const set = property => (state, payload) => (state[property] = payload);
export const toggle = property => state => (state[property] = !state[property]);

export default {
  setDrawer: set("drawer"),
  setImage: set("image"),
  setColor: set("color"),
  toggleDrawer: toggle("drawer")
};
