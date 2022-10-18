<template>
  <auth-frame>
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
  </auth-frame>
</template>

<script>
  import mockedAuth from '@/mocks/auth';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        const data = {
          email: this.email,
          password: this.password
        };

        return this.$store.dispatch('auth/executeLogin', data);
      },
    },
    metaInfo() {
      return {
        title: 'Welcome!'
      };
    },
    created() {
      console.log(mockedAuth);
    },
  };
</script>

<style lang="scss" scoped>
  .login-wrap {
    width: 100vw;
    height: 100vh;

    &__form {
      min-width: 300px;
    }
  }
</style>
