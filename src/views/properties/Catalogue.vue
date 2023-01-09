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
        show-starred-btn
        show-details
        show-location
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
        items: mockedProperties,
        filters: [
          { label: '1 Bedroom', color: 'primary' },
          { label: '2 Bedroom', color: 'primary' },
          { label: '3 Bedroom', color: 'primary' },
          { label: '1 Bath', color: 'secondary' },
          { label: '2 Bath', color: 'secondary' },
          { label: 'Apartment', color: 'green' },
          { label: 'House', color: 'green' },
          { label: 'Varna', color: 'orange' },
        ],
        filterDialog: false,
      };
    },
    methods: {
      CreateProperty() {
        this.$router.push({ name: 'create' });
      },
      toggleFilterDialog() {
        this.filterDialog = !this.filterDialog;
        console.log(this.filterDialog);
      },
    },
  };
</script>
