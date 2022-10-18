<template>
  <div
    data-component-group="layouts"
    data-component="logged-frame"
  >
    <main-menu />

    <v-main>
      <v-toolbar
        flat absolute
        class="main-toolbar"
      >
        <span class="text-h6">{{ $route.meta.label }}</span>
        <!-- <breadcrumbs /> -->
        <v-spacer />
        <div><slot name="actions" /></div>
      </v-toolbar>

      <div class="content-wrap"><slot /></div>
    </v-main>

    <slot name="overlay" />
  </div>
</template>

<script>
  import MainMenu from '@/components/MainMenu';
  // import Breadcrumbs from '@/components/Breadcrumbs';

  export default {
    components: { MainMenu },
  };
</script>

<style lang="scss" scoped>
  [data-component-group="layouts"][data-component="logged-frame"] {
    .content-wrap {
      padding-top: 72px;
    }

    .main-toolbar {
      width: 100%;
      border-bottom: 1px solid rgba(0,0,0,.12);;
    }
  }
</style>
