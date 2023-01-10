<script>
  import PropertyDetails from '@/components/panels/PropertyDetails';

  export default {
    name: 'PropertyCreate',
    components: { PropertyDetails },
  };
</script>

<template>
  <LoggedFrame>
    <div class="px-10 py-8">
      <PropertyDetails />
    </div>
  </LoggedFrame>
</template>
