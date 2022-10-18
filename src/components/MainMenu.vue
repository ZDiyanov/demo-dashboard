<template>
  <div>
    <v-app-bar
      v-if="!isDesktop" fixed
      dark hide-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer></v-spacer>

      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer" app
      :mini-variant.sync="isMinimized" :permanent="isDesktop"
    >
      <template v-slot:prepend>
        <template v-if="isDesktop">
          <v-list-item class="pr-2">
            <v-list-item-content class="pa-0">
              <v-list-item-title>VIVAHOME</v-list-item-title>
            </v-list-item-content>

            <v-btn icon @click.stop="isMinimized = !isMinimized">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider />
        </template>

        <v-list-item class="px-2">
          <v-list-item-avatar color="pink">
            <span>{{ user.initials }}</span>
          </v-list-item-avatar>

          <v-list-item-content class="pa-0">
            <v-list-item-title>{{ user.firstname }} {{ user.lastname }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.position }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-btn icon disabled @click.prevent="redirect('profile')">
            <v-icon>mdi-account-cog</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider />
      </template>

      <v-list nav dense>
        <template v-for="(group, index) in tabs.groups">
          <v-list-item-group :key="index" v-if="group.items.length">
            <v-subheader v-show="!isMinimized">{{ group.label.toUpperCase() }}</v-subheader>
            <v-list-item
              v-for="(item, index) in group.items" :key="index"
              link :disabled="item.disabled"
              @click="onTabClick(item.slug, item.method)"
            >
              <v-list-item-icon>
                <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </template>
      </v-list>

      <template v-slot:append>
        <v-divider />

        <v-list nav dense>
          <v-list-item
            v-for="(item, index) in tabs.app" :key="index"
            link :disabled="item.disabled"
            @click="onTabClick(item.slug, item.method)"
          >
            <v-list-item-icon>
              <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import { isUndef, isNull } from '@/core/utils';
  import tabs from '@/core/configs/menu';

  export default {
    data() {
      return {
        drawer: false,
        isMinimized: false,
        tabs,
      };
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
      isDesktop() {
        return this.$vuetify.breakpoint.mdAndUp;
      },
    },
    methods: {
      onTabClick(route, method) {
        if (!isNull(method)) {
          this[method]();
          return;
        }

        if (!isUndef(route)) {
          this.redirect(route);
        }
      },
      redirect(route) {
        this.$router.push({ name: route, params: { } });
      },
      logout() {
        return this.$store.dispatch('auth/logout');
      },
    },
  };
</script>
