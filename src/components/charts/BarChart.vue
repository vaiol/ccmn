<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    data: Object,
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
  mounted() {
    this.renderChart(this.data, {
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
    });
  }
};
</script>
