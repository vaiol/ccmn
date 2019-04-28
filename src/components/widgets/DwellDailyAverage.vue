<template>
  <div v-if="data">
    <BarChart :chart-data="chartData" :text="text" :x-axes="true" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  data() {
    return {
      labels: WEEK_DAYS,
      data: null,
      text: "Visitors Daily Average Time"
    };
  },
  computed: {
    ...mapGetters("params", ["params"]),
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
    }
  },
  methods: {
    async getData() {
      if (this.params.siteId) {
        this.data = await api.getDwellDailyAverage(
          null,
          null,
          this.params.siteId
        );
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
