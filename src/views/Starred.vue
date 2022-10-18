<template>
  <logged-frame>
    <div class="px-10 py-8">

      <catalogue-grid
        :items="items"
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
        items: [ ...mockedProperties].splice(3, 2),
      };
    },
    methods: {
      CreateProperty() {
        this.$router.push({ name: 'create' });
      },
    },
  };
</script>
