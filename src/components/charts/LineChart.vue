<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["data", "text"],
  mounted() {
    this.renderChart(this.data, {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: this.text
      }
    });
  }
};
</script>
