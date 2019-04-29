<template>
  <div v-if="data">
    <BarChart :chart-data="chartData" :text="text" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";
import { WEEK_DAYS, BACKGROUND_COLORS, BORDER_COLORS } from "@/constants";

export default {
  components: {
    BarChart
  },
  data() {
    return {
      data: null,
      text: "Average Daily Users Connection",
      label: "Connected users"
    };
  },
  computed: {
    ...mapGetters("params", ["params"]),
    chartData() {
      return {
        labels: WEEK_DAYS,
        datasets: [
          {
            label: this.label,
            backgroundColor: Object.values(BORDER_COLORS)[0],
            borderColor: Object.values(BACKGROUND_COLORS)[0],
            data: this.data
          }
        ]
      };
    }
  },
  methods: {
    async getData() {
      if (this.params.siteId) {
        this.data = await api.connectedDaily(null, null, this.params.siteId);
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
