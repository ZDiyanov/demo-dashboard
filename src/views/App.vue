<template>
  <v-app>
    <router-view />
    <idle-manager />
    <alerts-manager />
    <popups-manager />
  </v-app>
</template>

<script>
  import AlertsManager from '@/components/AlertsManager';
  import IdleManager from '@/components/IdleManager';
  import PopupsManager from '@/components/PopupsManager';

  export default {
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

<style lang="scss">
  .app-wrapper {
    box-sizing: border-box;

    * {box-sizing: border-box;}
  }
</style>
