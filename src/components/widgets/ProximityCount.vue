<template>
  <BarChart :data="chartData" :text="text" />
</template>

<script>
import BarChart from "@/components/charts/BarChart";
import api from "@/api/presence";

export default {
  components: {
    BarChart
  },
  data: () => ({
    labels: ["Passerby", "Visitors", "Connected"],
    data: {},
    text: "Proximity Distribution"
  }),
  props: ["params", "interval"],
  watch: {
    async params() {
      await this.getData();
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        // TODO add dataset
        datasets: []
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
