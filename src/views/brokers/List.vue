<script>
  import mockedBrokers from '@/mocks/users';

  export default {
    name: 'BrokersList',
    data() {
      return {
        items: mockedBrokers,
      };
    },
    methods: {
      createBroker() {
        this.$router.push({ name: 'brokerCreate' });
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn
        elevation="1" disabled
        @click="createBroker"
      >
        <v-icon>mdi-briefcase-plus</v-icon>
        Create
      </v-btn>
    </template>

    <div class="px-10 py-8">

      data table

    </div>
  </LoggedFrame>
</template>
