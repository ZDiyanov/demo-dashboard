import Vue from 'vue';
import Vuex from 'vuex';
import persistentStore from '@/store/persistentStore';
import initialState from '@/store/initialState';
// eslint-disable-next-line import/no-cycle
import auth from '@/store/modules/auth';
import properties from '@/store/modules/properties';
import clients from '@/store/modules/clients';
import brokers from '@/store/modules/brokers';

Vue.use(Vuex);

const options = {
  plugins: [persistentStore.plugin],
  modules: {
    auth: auth(initialState.auth),
    properties: properties(initialState.properties),
    clients: clients(initialState.clients),
    brokers: brokers(initialState.brokers),
  }
};

/**
 * @description Reset stores
 * @param store
 */
export const resetStores = (store) => {
  store.dispatch('auth/reset');
  store.dispatch('properties/reset');
  store.dispatch('clients/reset');
  store.dispatch('brokers/reset');
};

export default new Vuex.Store(options);
