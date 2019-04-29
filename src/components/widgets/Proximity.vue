<template>
  <div v-if="data">
    <DoughnutChart :chart-data="chartData" :text="text" />
  </div>
</template>

<script>
import DoughnutChart from "@/components/charts/DoughnutChart";

export default {
  components: {
    DoughnutChart
  },
  props: ["data"],
  data() {
    return {
      labels: ["Passerby", "Visitors", "Connected"],
      text: "Proximity Count"
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: ["#28a745", "#DC3545", "#007bff"],
            borderColor: [
              "rgba(40,167,69,0.5)",
              "rgba(220,53,69,0.5)",
              "rgba(0, 123, 255, 0.5)"
            ],
            data: [
              this.data.totalPasserby,
              this.data.totalVisitors,
              this.data.totalConnected
            ]
          }
        ]
      };
    }
  }
};
</script>
