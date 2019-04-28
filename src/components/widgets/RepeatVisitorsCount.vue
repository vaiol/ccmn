<template>
  <div v-if="data">
    <DoughnutChart :chart-data="chartData" :text="text" :x-axes="true" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DoughnutChart from "@/components/charts/DoughnutChart";
import api from "@/api/presence";
import { TIMES_LABELS, BORDER_COLORS, BACKGROUND_COLORS } from "@/constants";

export default {
  components: {
    DoughnutChart
  },
  data() {
    return {
      labels: TIMES_LABELS,
      data: null,
      text: "Repeat Visitors Distribution"
    };
  },
  computed: {
    ...mapGetters("params", ["params"]),
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
    }
  },
  methods: {
    async getData() {
      if (this.params.siteId) {
        this.data = await api.getRepeatVisitorsCount(this.params);
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
