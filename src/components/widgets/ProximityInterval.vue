<template>
  <div v-if="data">
    <BarChart :chart-data="chartData" :text="text" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  FIVE_TO_THIRTY_MINUTES,
  THIRTY_TO_SIXTY_MINUTES,
  ONE_TO_FIVE_HOURS
} from "@/constants";

export default {
  components: {
    BarChart
  },
  data() {
    return {
      labels: [],
      data: null,
      text: "Proximity"
    };
  },
  computed: {
    ...mapGetters("params", ["params", "interval"]),
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Passerby",
            backgroundColor: BORDER_COLORS[FIVE_TO_THIRTY_MINUTES],
            borderColor: BACKGROUND_COLORS[FIVE_TO_THIRTY_MINUTES],
            data: this.data.passerby
          },
          {
            label: "Visitors",
            backgroundColor: BORDER_COLORS[THIRTY_TO_SIXTY_MINUTES],
            borderColor: BACKGROUND_COLORS[THIRTY_TO_SIXTY_MINUTES],
            data: this.data.visitors
          },
          {
            label: "Connected",
            backgroundColor: BORDER_COLORS[ONE_TO_FIVE_HOURS],
            borderColor: BACKGROUND_COLORS[ONE_TO_FIVE_HOURS],
            data: this.data.connected
          }
        ]
      };
    }
  },
  methods: {
    async getData() {
      if (this.params.siteId) {
        const res = await api.getPasserby(this.params, this.interval);
        this.labels = res.labels;
        const data = {};
        data.passerby = res.data;
        data.visitors = await api.getVisitors(this.params, this.interval);
        data.connected = await api.getConnected(this.params, this.interval);
        this.data = data;
      }
    }
  },
  async mounted() {
    await this.getData();
  },
  watch: {
    async params() {
      await this.getData();
    }
  }
};
</script>
