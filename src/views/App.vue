<script>
  import AlertsManager from '@/components/base/AlertsManager';
  import IdleManager from '@/components/base/IdleManager';
  import PopupsManager from '@/components/base/PopupsManager';

  export default {
    name: 'App',
    components: {
      AlertsManager,
      IdleManager,
      PopupsManager,
    },
    computed: {
      permissions() {
        return this.$store.getters['auth/permissions'];
      }
    },
    created() {
      this.updateAbility();
    },
    methods: {
      updateAbility() {
        this.$ability.update(this.permissions);
      }
    },
    metaInfo() {
      const { title } = this;

      return {
        title,
        titleTemplate(viewTitle) {
          const appTitle = 'Profile Logger';

          return viewTitle !== appTitle
            ? `${appTitle} | ${viewTitle}`
            : appTitle;
        }
      };
    }
  };
</script>

<template>
  <v-app>
    <router-view />

    <IdleManager />
    <AlertsManager />
    <PopupsManager />
  </v-app>
</template>

<style lang="scss">
  .app-wrapper {
    box-sizing: border-box;

    * {box-sizing: border-box;}
  }
</style>
