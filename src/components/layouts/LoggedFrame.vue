<script>
  import Menu from '@/components/base/SideMenu';
  // import Breadcrumbs from '@/components/Breadcrumbs';

  export default {
    name: 'LoggedFrame',
    components: { Menu },
  };
</script>

<template>
  <div
    data-component-group="layouts"
    data-component="logged-frame"
  >
    <Menu />

    <v-main>
      <v-toolbar
        flat absolute
        class="main-toolbar"
      >
        <span class="text-h6">{{ $t($route.meta.slug) }}</span>
        <!-- <Breadcrumbs /> -->
        <v-spacer />
        <div><slot name="actions" /></div>
      </v-toolbar>

      <div class="content-wrap"><slot /></div>
    </v-main>

    <slot name="overlay" />
  </div>
</template>

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
