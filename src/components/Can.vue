<template>
  <fragment v-if="permitted">
    <slot />
  </fragment>
</template>

<script>
  export default {
    props: {
      action: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      }
    },
    computed: {
      permitted() {
        const { $ability, action, subject } = this;
        return $ability.can(action, subject);
      }
    }
  };
</script>
