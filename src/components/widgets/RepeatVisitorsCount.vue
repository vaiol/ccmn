<template>
  <DoughnutChart :data="chartData" :text="text" />
</template>

<script>
import DoughnutChart from "@/components/charts/DoughnutChart";
import api from "@/api/presence";
import { TIMES_LABELS, BORDER_COLORS, BACKGROUND_COLORS } from "@/constants";

export default {
  components: {
    DoughnutChart
  },
  data: () => ({
    labels: TIMES_LABELS,
    data: [],
    text: "Repeat Visitors Distribution"
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
        datasets: [
          {
            backgroundColor: Object.values(BACKGROUND_COLORS),
            borderColor: Object.values(BORDER_COLORS),
            data: this.data
          }
        ]
      };
    },
    methods: {
      async getData() {
        this.data = await api.getRepeatVisitorsCount(this.params);
      }
    }
  }
};
</script>
