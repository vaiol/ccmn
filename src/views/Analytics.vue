<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex sm6 xs12 md6 lg6 v-if="summary">
        <StatsCard
          color="primary"
          icon="mdi-store"
          title="Total visitors"
          :value="summary.totalVisitors"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg6 v-if="summary">
        <StatsCard
          color="primary"
          icon="mdi-store"
          title="Average Dwell Time"
          :value="summary.dwellTime"
          small-value="mins"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="orange"
          icon="mdi-content-copy"
          title="Peak Hour"
          :value="summary.peakHour"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="orange"
          icon="mdi-content-copy"
          title="Conversion Rate"
          :value="summary.conversionRate"
          small-value="%"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4 v-if="summary">
        <StatsCard
          color="orange"
          icon="mdi-content-copy"
          title="Top Device"
          :value="summary.topDevice"
        />
      </v-flex>
      <v-flex xs12>
        <DwellDaily />
      </v-flex>
      <v-flex xs12>
        <DwellDailyAverage />
      </v-flex>
      <v-flex xs12>
        <ConnectedDayCorrelation />
      </v-flex>
      <v-flex xs12>
        <RepeatVisitorsCount />
      </v-flex>
      <v-flex xs12>
        <RepeatVisitorsHourly />
      </v-flex>
      <v-flex xs12>
        <ProximityHourly />
      </v-flex>
      <!--      <v-flex xs12>-->
      <!--        <ProximityCount />-->
      <!--      </v-flex>-->
      <!--      <v-flex xs12>-->
      <!--        <DwellTimeHourly />-->
      <!--      </v-flex>-->
      <!--      <v-flex xs12>-->
      <!--        <DwellTimeCount />-->
      <!--      </v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
import StatsCard from "@/components/material/StatsCard";
import DwellDaily from "@/components/widgets/DwellDaily";
import DwellDailyAverage from "@/components/widgets/DwellDailyAverage";
import ConnectedDayCorrelation from "@/components/widgets/ConnectedDayCorrelation";
import RepeatVisitorsHourly from "@/components/widgets/RepeatVisitorsHourly";
import RepeatVisitorsCount from "@/components/widgets/RepeatVisitorsCount";
import ProximityHourly from "@/components/widgets/ProximityHourly";
// import ProximityCount from "@/components/widgets/ProximityCount";
// import DwellTimeHourly from "@/components/widgets/DwellTimeHourly";
// import DwellTimeCount from "@/components/widgets/DwellTimeCount";
import api from "@/api/presence";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    StatsCard,
    DwellDaily,
    DwellDailyAverage,
    ConnectedDayCorrelation,
    RepeatVisitorsHourly,
    RepeatVisitorsCount,
    ProximityHourly
    // ProximityCount
    // DwellTimeHourly,
    // DwellTimeCount
  },
  data() {
    return {
      interval: "hourly",
      summary: null
    };
  },
  async mounted() {
    this.sites = await api.getConfig();
    this.setSite(this.sites[0].value);
    this.summary = await api.getSummary(this.params);
  },
  computed: {
    ...mapGetters("params", ["params"])
  },
  methods: {
    ...mapActions("params", ["setSite"])
  }
};
</script>
