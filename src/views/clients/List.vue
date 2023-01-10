<script>
  import mockedClients from '@/mocks/clients';

  export default {
    name: 'ClientsList',
    data() {
      return {
        items: mockedClients,
      };
    },
    methods: {
      createClient() {
        this.$router.push({ name: 'clientCreate' });
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn
        elevation="1" disabled
        @click="createClient"
      >
        <v-icon>mdi-account-plus</v-icon>
        Create
      </v-btn>
    </template>

    <div class="px-10 py-8">

      data table

    </div>
  </LoggedFrame>
</template>
