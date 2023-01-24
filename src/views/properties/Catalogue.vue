<script>
  import { mapGetters, mapActions } from 'vuex';
  import CatalogueGrid from '@/components/CatalogueGrid';
  import BaseDialog from '@/components/dialogs/BaseDialog';

  export default {
    name: 'PropertiesCatalogue',
    components: { CatalogueGrid, BaseDialog },
    data() {
      return {
        isDialogOn: false,
      };
    },
    computed: {
      ...mapGetters(
        { items: 'properties/items' },
      ),
    },
    created() {
      this.getProperties();
    },
    methods: {
      ...mapActions(
        { getProperties: 'properties/getItems' },
      ),
      createProperty() {
        this.$router.push({ name: 'propertyCreate' });
      },
      toggleDialog() {
        this.isDialogOn = !this.isDialogOn;
      },
      displayPropertyDetails() {
        this.isDialogOn = true;
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

    <BaseDialog
      title="Property" icon="mdi-briefcase"
      :is-on="isDialogOn" :on-close="toggleDialog"
    >
      <template #content>Modal Content</template>
    </BaseDialog>
  </LoggedFrame>
</template>
