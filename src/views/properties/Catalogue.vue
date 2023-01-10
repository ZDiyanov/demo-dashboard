<script>
  import CatalogueGrid from '@/components/CatalogueGrid';
  import mockedProperties from '@/mocks/properties';

  export default {
    name: 'PropertiesCatalogue',
    components: { CatalogueGrid },
    data() {
      return {
        items: mockedProperties,
      };
    },
    methods: {
      createProperty() {
        this.$router.push({ name: 'propertyCreate' });
      },
    },
  };
</script>

<template>
  <LoggedFrame>
    <template v-slot:actions>
      <v-btn
        elevation="1"
        @click="createProperty"
      >
        <v-icon>mdi-home-plus</v-icon>
        Create
      </v-btn>
    </template>

    <div class="px-10 py-8">

      <CatalogueGrid
        :items="items"
        show-price show-starred-btn
        show-details show-location
      />

    </div>
  </LoggedFrame>
</template>
