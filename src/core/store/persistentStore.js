import VuexPersistence from 'vuex-persist';
// import initialState from '@/core/store/initialState';

const { localStorage } = window;

export default new VuexPersistence({
  storage: localStorage,
  key: 'txp_services_app',
  reducer: (state) => ({
    ...state,
  }),
});
