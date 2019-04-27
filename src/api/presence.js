import axios from "axios";
import moment from "moment";
import {
  FIVE_TO_EIGHT_HOURS,
  EIGHT_PLUS_HOURS,
  FIVE_TO_THIRTY_MINUTES,
  ONE_TO_FIVE_HOURS,
  THIRTY_TO_SIXTY_MINUTES,
  TIMES,
  PERIODS
} from "@/constants";

const HTTP = axios.create({
  baseURL: "https://cmxlocationsandbox.cisco.com/api",
  auth: {
    username: "learning",
    password: "learning"
  },
  crossdomain: true
});

export default {
  async connectedDaily(start, end, siteId) {
    const url = "/presence/v1/connected/daily";
    const startDate = start
      ? moment(start)
      : moment()
          .subtract(3, "months")
          .format("YYYY-MM-DD");
    const endDate = end ? moment(end) : moment().format("YYYY-MM-DD");

    const response = await HTTP.get(url, {
      params: {
        siteId,
        startDate,
        endDate
      }
    });
    // TODO completely refactor this shit =>
    let i = 0;
    const res = [0, 0, 0, 0, 0, 0, 0];
    for (let key in response.data) {
      res[moment(key).day()] += response.data[key];
      i++;
    }
    // TODO completely refactor this shit =>
    Object.keys(res).map(key => {
      res[key] = Math.floor(res[key] / (i / 7));
    });
    return res;
  },
  async dwellCount(params) {
    const url = "/presence/v1/dwell/count/";
    const response = await HTTP.get(url, { params });
    return [
      response.data[FIVE_TO_THIRTY_MINUTES],
      response.data[THIRTY_TO_SIXTY_MINUTES],
      response.data[ONE_TO_FIVE_HOURS],
      response.data[FIVE_TO_EIGHT_HOURS],
      response.data[EIGHT_PLUS_HOURS]
    ];
  },
  async dwell(params, interval) {
    const url = `/presence/v1/dwell/${interval}`;
    const response = await HTTP.get(url, { params });
    const labels = [];
    const data = {
      [FIVE_TO_THIRTY_MINUTES]: [],
      [THIRTY_TO_SIXTY_MINUTES]: [],
      [ONE_TO_FIVE_HOURS]: [],
      [FIVE_TO_EIGHT_HOURS]: [],
      [EIGHT_PLUS_HOURS]: []
    };
    for (let key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        labels.push(key);
        for (let k in data) {
          data[k].push(response.data[key][k]);
        }
      }
    }
    return {
      labels,
      data
    };
  },
  async getPasserby(params, interval) {
    const url = `/presence/v1/passerby/${interval}`;
    const response = await HTTP.get(url, { params });
    const data = [];
    const labels = [];
    for (let key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        labels.push(key);
        data.push(response.data[key]);
      }
    }
    return {
      labels,
      data
    };
  },
  async getVisitors(params, interval) {
    const url = `/presence/v1/visitor/${interval}`;
    const response = await HTTP.get(url, { params });
    const data = [];
    for (let key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        data.push(response.data[key]);
      }
    }
    return data;
  },
  async getConnected(params, interval) {
    const url = `/presence/v1/connected/${interval}`;
    const response = await HTTP.get(url, { params });
    const data = [];
    for (let key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        data.push(response.data[key]);
      }
    }
    return data;
  },
  async getRepeatVisitorsCount(params) {
    const url = "/presence/v1/repeatvisitors/count/";
    const response = await HTTP.get(url, { params });
    return TIMES.map(time => response.data[time]);
  },
  async getRepeatVisitors(params, interval) {
    const url = `/presence/v1/repeatvisitors/${interval}`;
    const response = await HTTP.get(url, { params });

    const labels = [];
    const data = {};
    for (let key in response.data) {
      if (response.data.hasOwnProperty(key)) {
        labels.push(key);
        for (let time of TIMES) {
          if (!data[time]) {
            data[time] = [];
          }
          data[time].push(
            response.data[key][time] ? response.data[key][time] : 0
          );
        }
      }
    }
    return {
      labels,
      data
    };
  },
  async getDwellDailyAverage(
    start,
    end,
    siteId,
    url = "/presence/v1/dwell/dailyaverage"
  ) {
    const startDate = start
      ? moment(start)
      : moment()
          .subtract(3, "months")
          .format("YYYY-MM-DD");
    const endDate = end ? moment(end) : moment().format("YYYY-MM-DD");

    const response = await HTTP.get(url, {
      params: {
        siteId,
        startDate,
        endDate
      }
    });
    let i = 0;
    const connectedUsers = [[], [], [], [], [], [], []];
    for (let key in response.data) {
      if (!connectedUsers[moment(key).day()]) {
        connectedUsers[moment(key).day()] = [];
      }
      for (let k in response.data[key]) {
        if (!connectedUsers[moment(key).day()][k]) {
          connectedUsers[moment(key).day()][k] = 0;
        }
        connectedUsers[moment(key).day()][k] += response.data[key][k];
      }
      i++;
    }
    const data = {
      [FIVE_TO_THIRTY_MINUTES]: [],
      [THIRTY_TO_SIXTY_MINUTES]: [],
      [ONE_TO_FIVE_HOURS]: [],
      [FIVE_TO_EIGHT_HOURS]: [],
      [EIGHT_PLUS_HOURS]: []
    };
    for (let key in connectedUsers) {
      let arrays = Object.entries(connectedUsers[key]);
      for (let k in arrays) {
        for (const period of PERIODS) {
          if (arrays[k][0] === period) {
            data[period].push(Math.floor(arrays[k][1] / (i / 7)));
          }
        }
      }
    }
    return data;
  },
  async getDwellDaily(start, end, siteId) {
    return this.getDwellDailyAverage(start, end, siteId);
  }
};
