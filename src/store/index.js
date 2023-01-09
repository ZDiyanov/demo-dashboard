import Vue from 'vue';
import Vuex from 'vuex';
import persistentStore from '@/store/persistentStore';
import initialState from '@/store/initialState';
// eslint-disable-next-line import/no-cycle
import auth from '@/store/modules/auth';

Vue.use(Vuex);

const options = {
  plugins: [persistentStore.plugin],
  modules: {
    auth: auth(initialState.auth),
  }
};

/**
 * @description Reset stores
 * @param store
 */
export const resetStores = (store) => {
  store.dispatch('auth/reset');
};

export default new Vuex.Store(options);
