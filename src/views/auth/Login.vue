<script>
  export default {
    name: 'Login',
    data() {
      return {
        email: 'p.radev@vivahome.bg',
        password: 'asdasdASD!',
      };
    },
    methods: {
      login() {
        const { email, password } = this;
        return this.$store.dispatch('auth/executeLogin', { email, password });
      },
    },
    metaInfo() {
      return {
        title: 'Welcome!'
      };
    },
  };
</script>

<template>
  <AuthFrame>
    <div class="login-wrap d-flex justify-center align-center">
      <v-card class="px-10 py-6">
        <div class="login-wrap__form">
          <v-text-field
            v-model="email"
            label="Email"
            required
            type="email"
            :autofocus="true"
          />
          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
            :autofocus="true"
          />
          <v-btn
            @click="login"
          >
            Login
          </v-btn>
        </div>
      </v-card>
    </div>
  </AuthFrame>
</template>

<style lang="scss" scoped>
  .login-wrap {
    width: 100vw;
    height: 100vh;

    &__form {
      min-width: 300px;
    }
  }
</style>
