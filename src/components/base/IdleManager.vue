<script>
  const { VUE_APP_IDLE_TIMEOUT_MINUTES } = process.env;

  export default {
    name: 'IdleManager',
    data() {
      return {
        events: ['click', 'keypress', 'scroll'],
        idleTime: 0, // minutes
        idleTimeout: VUE_APP_IDLE_TIMEOUT_MINUTES,
        countTimeout: 60000 // milliseconds
      };
    },
    computed: {
      isLogged() {
        return this.$store.getters['auth/isLogged'];
      }
    },
    created() {
      this.addListeners();
      setInterval(this.incrementIdleTime, this.countTimeout);
    },
    beforeDestroy() {
      this.removeListeners();
    },
    methods: {
      addListeners() {
        this.events.forEach((event) => (
          window.addEventListener(event, this.interceptInteraction)
        ));
      },
      removeListeners() {
        this.events.forEach((event) => (
          window.removeEventListener(event, this.interceptInteraction)
        ));
      },
      interceptInteraction() {
        this.idleTime = 0;
      },
      incrementIdleTime() {
        this.idleTime += 1;

        if (this.idleTime > this.idleTimeout) {
          this.logout();
        }
      },
      logout() {
        this.idleTime = 0;

        if (this.isLogged) {
          return this.$store.dispatch('auth/logout')
            .catch((err) => err);
        }
      }
    },
  };
</script>

<!-- eslint-disable-next-line vue/valid-template-root -->
<template />
