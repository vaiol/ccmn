<template>
  <BarChart :data="chartData" :text="text" />
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";
import { LABELS, PERIODS, BACKGROUND_COLORS, BORDER_COLORS } from "@/constants";

export default {
  components: {
    BarChart
  },
  data: () => ({
    labels: [],
    data: {},
    text: "Dwell Time"
  }),
  props: ["params", "interval"],
  watch: {
    async params() {
      await this.getData();
    }
  },
  computed: {
    chartData() {
      // TODO check border and background colors positions
      return {
        labels: this.labels,
        datasets: PERIODS.map(period => ({
          label: LABELS[period],
          backgroundColor: BORDER_COLORS[period],
          borderColor: BACKGROUND_COLORS[period],
          data: this.data[period]
        }))
      };
    },
    methods: {
      async getData() {
        const res = await api.dwell(this.params, this.interval);
        this.labels = res.labels;
        this.data = res.data;
      }
    }
  }
};
</script>
