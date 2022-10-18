<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'mdi-home',
            disabled: false,
            href: 'breadcrumbs_dashboard',
          },
          {
            text: 'Link 1',
            disabled: false,
            href: 'breadcrumbs_link_1',
          },
          {
            text: 'Link 2',
            disabled: true,
            href: 'breadcrumbs_link_2',
          },
        ],
      };
    },
  };
</script>
