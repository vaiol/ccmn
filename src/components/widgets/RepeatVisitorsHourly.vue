<template>
  <div v-if="data">
    <LineChart :chart-data="chartData" :text="text" :x-axes="true" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart from "@/components/charts/LineChart";
import api from "@/api/presence";
import {
  TIMES_LABELS,
  TIMES,
  BORDER_COLORS,
  BACKGROUND_COLORS
} from "@/constants";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      labels: TIMES_LABELS,
      data: null,
      text: "Repeat Visitors"
    };
  },
  computed: {
    ...mapGetters("params", ["params", "interval"]),
    chartData() {
      if (!this.data) {
        return null;
      }
      return {
        labels: this.labels,
        datasets: TIMES.map((time, index) => ({
          label: TIMES_LABELS[index],
          backgroundColor: Object.values(BORDER_COLORS)[index],
          borderColor: Object.values(BACKGROUND_COLORS)[index],
          data: this.data[time]
        }))
      };
    }
  },
  methods: {
    async getData() {
      if (this.params.siteId) {
        const { labels, data } = await api.getRepeatVisitors(
          this.params,
          this.interval
        );
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
