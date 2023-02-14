<script>
  import { isUndef, isNull } from '@/utils';
  import tabs from '@/configs/menu';

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
            <span>{{ `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` }}</span>
          </v-list-item-avatar>

          <v-list-item-content class="pa-0">
            <v-list-item-title>{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.positionId }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-btn
            v-if="$ability.can('list-all', 'permissions')"
            icon disabled
            @click.prevent="redirect('profile')"
          >
            <v-icon>mdi-account-cog</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider />
      </template>

      <v-list nav dense>
        <template v-for="(group, index) in tabs.groups">
          <v-list-item-group
            :key="index"
            v-if="
              group.items.length
              && ($ability.can('list-all', group.subject) || $ability.can('view', group.subject))"
          >
            <v-subheader v-show="!isMinimized">{{ $t(group.slug).toUpperCase() }}</v-subheader>
            <template v-for="(item, index) in group.items">
              <v-list-item
                v-if="!item.action || $ability.can(item.action, group.subject)"
                :key="index"
                link :disabled="item.disabled"
                @click="onTabClick(item.route, item.method)"
              >
                <v-list-item-icon>
                  <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t(item.slug) }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list-item-group>
        </template>
      </v-list>

      <template v-slot:append>
        <v-divider />

        <v-list nav dense>
          <template
            v-for="(item, index) in tabs.app"
          >
            <v-list-item
              v-if="!item.action || $ability.can(item.action, 'permissions')"
              :key="index"
              link :disabled="item.disabled"
              @click="onTabClick(item.route, item.method)"
            >
              <v-list-item-icon>
                <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t(item.slug) }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>
