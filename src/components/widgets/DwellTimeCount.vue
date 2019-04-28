<template>
  <div v-if="data">
    <DoughnutChart :chart-data="chartData" :text="text" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DoughnutChart from "@/components/charts/DoughnutChart";
import api from "@/api/presence";
import { LABELS, PERIODS, BACKGROUND_COLORS, BORDER_COLORS } from "@/constants";

export default {
  components: {
    DoughnutChart
  },
  data() {
    return {
      data: null,
      text: "Dwell Time Distribution" // TODO change text and file name
    };
  },
  computed: {
    ...mapGetters("params", ["params"]),
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
      if (this.params.siteId) {
        this.data = api.dwellCount(this.params);
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
