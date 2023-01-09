<template>
  <logged-frame>
    <template v-slot:actions>
      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <div class="px-10 py-8">

      <h5 class="text-h6">Under Construction - dashboard index</h5>

      <div class="dashboard__permission-list">
        <Can
          action="view"
          subject="app"
        >
          <p>* {{ user.firstname }} can view the dashboard</p>
        </Can>
        <Can
          action="edit"
          subject="app"
        >
          <p>* {{ user.firstname }} can edit the dashboard</p>
        </Can>
      </div>
    </div>
  </logged-frame>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      }
    },
    metaInfo() {
      return {
        title: 'Logged'
      };
    },
  };
</script>

<style lang="scss" scoped>
  .dashboard {
    max-width: 780px;
    padding: 20px 10px;
    margin: 0 auto;

    .user {
      margin-bottom: 16px;

      &--name {
        font-size: 22px;
        font-weight: bold;
      }

      &--position {
        margin-right: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }

      &--email {
        font-size: 14px;
        color: #777;
      }
    }

    &__map {
      margin: 40px 0;
    }

    &__permission-list {
      font-size: 12px;
      color: #777;
    }
  }
</style>
