<template>
  <div v-if="data">
    <BarChart :chart-data="chartData" :text="text" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";
import { LABELS, PERIODS, BACKGROUND_COLORS, BORDER_COLORS } from "@/constants";

export default {
  components: {
    BarChart
  },
  data() {
    return {
      labels: [],
      data: null,
      text: "Dwell Time"
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
        const { labels, data } = await api.dwell(this.params, this.interval);
        this.labels = labels;
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
