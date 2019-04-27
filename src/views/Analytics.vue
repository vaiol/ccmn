<template>
  <v-layout>
    <v-layout align-end justify-end column fill-height>
      <v-item-group multiple>
        <v-item>
          <v-card
            slot-scope="{ active, toggle }"
            :selected="active"
            @click="toggle"
          >
            Total Connected
          </v-card>
        </v-item>
      </v-item-group>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  components: {}
};
</script>
