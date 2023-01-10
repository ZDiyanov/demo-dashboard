<script>
  export default {
    name: 'ClientsIndex',
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

      <h5 class="text-h6">Under Construction - clients index</h5>

    </div>
  </LoggedFrame>
</template>
