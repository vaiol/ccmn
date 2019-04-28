<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex sm6 xs12 md6 lg6>
        <StatsCard
          color="primary"
          icon="mdi-store"
          title="Revenue"
          value="$34,245"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg6>
        <StatsCard
          color="primary"
          icon="mdi-store"
          title="Revenue"
          value="$34,245"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4>
        <StatsCard
          color="orange"
          icon="mdi-content-copy"
          title="Used Space"
          value="49/50"
          small-value="GB"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4>
        <StatsCard
          color="orange"
          icon="mdi-content-copy"
          title="Fixed Issues"
          value="75"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg4>
        <StatsCard
          color="orange"
          icon="mdi-content-copy"
          title="Followers"
          value="+245"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StatsCard from "@/components/material/StatsCard";
export default {
  components: {
    StatsCard
  },
  data() {
    return {
      interval: "hourly"
    };
  },
  methods: {}
};
</script>
