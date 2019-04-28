<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    text: String,
    xAxes: {
      type: Boolean,
      default: false
    },
    yAxes: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: this.text
        },
        scales: {
          xAxes: [
            {
              stacked: this.xAxes
            }
          ],
          yAxes: [
            {
              stacked: this.yAxes
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
