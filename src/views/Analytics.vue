<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs4>
            <v-select :items="sites" v-model="site" label="Place"></v-select>
          </v-flex>
          <v-flex xs4></v-flex>
          <v-flex xs4>
            <date-picker
              :first-day-of-week="1"
              :not-after="new Date()"
              v-model="date"
              :lang="lang"
              range
              :shortcuts="shortcuts"
              width="300"
              class="datepicker pt-3 right"
            ></date-picker>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="primary"
          icon="mdi-account-multiple"
          title="Total visitors"
          :value="summary.totalVisitors"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="blue"
          icon="mdi-av-timer"
          title="Average Dwell Time"
          :value="summary.dwellTime"
          small-value="mins"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="red"
          icon="mdi-store-24-hour"
          title="Peak Hour"
          :value="summary.peakHour"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="orange"
          icon="mdi-star"
          title="Conversion Rate"
          :value="summary.conversionRate"
          small-value="%"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="dark"
          icon="mdi-monitor-cellphone-star"
          title="Top Device"
          :value="summary.topDevice"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="forecasts">
        <StatsCard
          color="purple"
          icon="mdi-feature-search"
          title="Tomorrow visits"
          :value="forecasts.nextDayVisitors"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="forecasts">
        <StatsCard
          color="purple"
          icon="mdi-feature-search"
          title="Tomorrow connected"
          :value="forecasts.nextDayConnected"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="forecasts">
        <StatsCard
          color="purple"
          icon="mdi-feature-search"
          title="Tomorrow passerby"
          :value="forecasts.nextDayPasserby"
        />
      </v-flex>
      <v-flex xs12 md8>
        <RepeatVisitorsInterval />
      </v-flex>
      <v-flex xs12 md4>
        <RepeatVisitors />
      </v-flex>
      <v-flex xs12 md8>
        <ProximityInterval />
      </v-flex>
      <v-flex xs12 md4>
        <Proximity :data="summary" />
      </v-flex>
      <v-flex xs12 md8>
        <DwellInterval />
      </v-flex>
      <v-flex xs12 md4>
        <DwellCount />
      </v-flex>
      <v-flex xs12>
        <DwellDaily />
      </v-flex>
      <v-flex xs12>
        <DwellDailyAverage />
      </v-flex>
      <v-flex xs12>
        <ConnectedDaily />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DatePicker from "vue2-datepicker";
import StatsCard from "@/components/material/StatsCard";
import DwellDaily from "@/components/widgets/DwellDaily";
import DwellDailyAverage from "@/components/widgets/DwellDailyAverage";
import ConnectedDaily from "@/components/widgets/ConnectedDaily";
import RepeatVisitorsInterval from "@/components/widgets/RepeatVisitorsInterval";
import RepeatVisitors from "@/components/widgets/RepeatVisitors";
import ProximityInterval from "@/components/widgets/ProximityInterval";
import Proximity from "@/components/widgets/Proximity";
import DwellInterval from "@/components/widgets/DwellInterval";
import DwellCount from "@/components/widgets/DwellCount";
import api from "@/api/presence";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    StatsCard,
    DwellDaily,
    DwellDailyAverage,
    ConnectedDaily,
    RepeatVisitorsInterval,
    RepeatVisitors,
    ProximityInterval,
    Proximity,
    DwellInterval,
    DwellCount,
    DatePicker
  },
  data() {
    return {
      sites: [],
      site: null,
      summary: null,
      forecasts: null,
      date: [new Date(), new Date()],
      shortcuts: [
        {
          text: "Today",
          onClick: () => {
            this.date = [new Date(), new Date()];
          }
        },
        {
          text: "Yesterday",
          onClick: () => {
            this.date = [
              new Date(Date.now() - 24 * 60 * 60 * 1000),
              new Date(Date.now() - 24 * 60 * 60 * 1000)
            ];
          }
        },
        {
          text: "Last week",
          onClick: () => {
            this.date = [
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              new Date()
            ];
          }
        },
        {
          text: "Last month",
          onClick: () => {
            this.date = [
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              new Date()
            ];
          }
        }
      ],
      lang: {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        placeholder: {
          date: "Select Date",
          dateRange: "Select Date Range"
        }
      }
    };
  },
  async mounted() {
    this.sites = await api.getConfig();
    this.setSite(this.sites[0].value);
    this.site = this.sites[0].value;
    await this.getData();
    this.date = [
      new Date(this.params.startDate),
      new Date(this.params.endDate)
    ];
    this.forecasts = await api.getForecastData(this.params);
  },
  computed: {
    ...mapGetters("params", ["params"])
  },
  methods: {
    ...mapActions("params", ["setSite", "setPeriod"]),
    async getData() {
      this.summary = await api.getSummary(this.params);
    }
  },
  watch: {
    site(newValue) {
      this.setSite(newValue);
    },
    date() {
      this.setPeriod({
        startDate: this.date[0],
        endDate: this.date[1]
      });
      this.getData();
    }
  }
};
</script>

<style>
input {
  width: 100% !important;
}
date-picker .datepicker .mx-datepicker {
  border: gray 1px;
}
</style>
