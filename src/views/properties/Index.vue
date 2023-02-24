<script>
  import CatalogueGrid from '@/components/CatalogueGrid';
  import mockedProperties from '@/mocks/properties';

  export default {
    name: 'PropertiesIndex',
    components: { CatalogueGrid },
    data() {
       return {
        items: [ ...mockedProperties].splice(0, 1),
      };
    },
    methods: {
      createProperty() {
        this.$router.push({ name: 'create' });
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
        show-price show-details
      />

    </div>
  </LoggedFrame>
</template>
