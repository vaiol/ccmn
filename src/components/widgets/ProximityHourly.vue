<template>
  <BarChart :data="chartData" :text="text" />
</template>

<script>
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
  data: () => ({
    labels: [],
    passerby: [],
    visitors: [],
    connected: [],
    text: "Proximity"
  }),
  props: ["params", "interval"],
  watch: {
    async params() {
      await this.getData();
    }
  },
  computed: {
    chartData() {
      return {
        // TODO add constants
        labels: this.labels,
        datasets: [
          {
            label: "Passerby",
            backgroundColor: BORDER_COLORS[FIVE_TO_THIRTY_MINUTES],
            borderColor: BACKGROUND_COLORS[FIVE_TO_THIRTY_MINUTES],
            data: this.passerby
          },
          {
            label: "Visitors",
            backgroundColor: BORDER_COLORS[THIRTY_TO_SIXTY_MINUTES],
            borderColor: BACKGROUND_COLORS[THIRTY_TO_SIXTY_MINUTES],
            data: this.visitors
          },
          {
            label: "Connected",
            backgroundColor: BORDER_COLORS[ONE_TO_FIVE_HOURS],
            borderColor: BACKGROUND_COLORS[ONE_TO_FIVE_HOURS],
            data: this.connected
          }
        ]
      };
    },
    methods: {
      async getData() {
        const res = await api.getPasserby(this.params, this.interval);
        this.labels = res.labels;
        this.passerby = res.data;
        this.visitors = await api.getVisitors(this.params, this.interval);
        this.connected = await api.getConnected(this.params, this.interval);
      }
    }
  }
};
</script>
