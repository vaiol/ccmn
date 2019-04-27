<template>
  <DoughnutChart :data="chartData" :text="text" />
</template>

<script>
import DoughnutChart from "@/components/charts/DoughnutChart";
import api from "@/api/presence";
import { LABELS, PERIODS, BACKGROUND_COLORS, BORDER_COLORS } from "@/constants";

export default {
  components: {
    DoughnutChart
  },
  data: () => ({
    data: [],
    text: "Dwell Time Distribution" // TODO change text and file name
  }),
  props: ["params"],
  watch: {
    async params() {
      await this.getData();
    }
  },
  computed: {
    chartData() {
      return {
        labels: PERIODS.map(period => LABELS[period]),
        datasets: [
          {
            backgroundColor: PERIODS.map(period => BACKGROUND_COLORS[period]),
            borderColor: PERIODS.map(period => BORDER_COLORS[period]),
            data: this.data
          }
        ]
      };
    }
  },
  methods: {
    async getData() {
      this.data = api.dwellCount(this.params);
    }
  }
};
</script>
