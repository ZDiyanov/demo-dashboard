<template>
  <logged-frame>
    <div class="px-10 py-8">
      <PropertyDetails />
    </div>
  </logged-frame>
</template>

<script>
  import PropertyDetails from '@/components/panels/PropertyDetails';

  export default {
    name: 'CreateProperty',
    components: { PropertyDetails },
  };
</script>
