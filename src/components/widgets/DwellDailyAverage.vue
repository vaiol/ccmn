<template>
  <BarChart :data="chartData" :text="text" x-axes="true" />
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  LABELS,
  WEEK_DAYS,
  PERIODS
} from "@/constants";

export default {
  components: {
    BarChart
  },
  data: () => ({
    labels: WEEK_DAYS,
    data: {},
    text: "Daily Correlation Visitor Dwell Time by Dwell Level"
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
        this.data = await api.getDwellDailyAverage(
          null,
          null,
          this.params.siteId
        );
      }
    }
  }
};
</script>
