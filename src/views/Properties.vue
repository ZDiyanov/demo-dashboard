<template>
  <logged-frame>
    <template v-slot:actions>
      <v-btn
        elevation="1"
        @click="CreateProperty"
      >
        <v-icon>mdi-home-plus</v-icon>
        Create
      </v-btn>
    </template>

    <div class="px-10 py-8">

      <catalogue-grid
        :items="items"
        show-price
        show-details
      />

    </div>
  </logged-frame>
</template>

<script>
  import CatalogueGrid from '@/components/CatalogueGrid';
  import mockedProperties from '@/mocks/properties';

  export default {
    components: { CatalogueGrid },
    data() {
       return {
        items: [ ...mockedProperties].splice(0, 1),
      };
    },
    methods: {
      CreateProperty() {
        this.$router.push({ name: 'create' });
      },
    },
  };
</script>
