<template>
  <BarChart :data="chartData" :text="text" />
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";
import { WEEK_DAYS, BACKGROUND_COLORS, BORDER_COLORS } from "@/constants";

export default {
  components: {
    BarChart
  },
  data: () => ({
    data: [],
    text: "Daily Correlation Users by Connected Users",
    label: "Connected users"
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
        labels: WEEK_DAYS,
        datasets: [
          {
            label: this.label,
            backgroundColor: BORDER_COLORS[0],
            borderColor: BACKGROUND_COLORS[0],
            data: this.data
          }
        ]
      };
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.data = await api.connectedDaily(null, null, this.params.siteId);
    }
  }
};
</script>
