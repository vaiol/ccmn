<template>
  <div v-if="data">
    <BarChart :chart-data="chartData" :text="text" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";

export default {
  components: {
    BarChart
  },
  data() {
    return {
      labels: ["Passerby", "Visitors", "Connected"],
      data: null,
      text: "Proximity Distribution"
    };
  },
  computed: {
    ...mapGetters("params", ["params", "interval"]),
    chartData() {
      return {
        labels: this.labels,
        // TODO add dataset
        datasets: []
      };
    }
  },
  methods: {
    async getData() {
      if (this.params.siteId) {
        const { labels } = await api.dwell(this.params, this.interval);
        this.labels = labels;
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
