import VuexPersistence from 'vuex-persist';
// import initialState from '@/store/initialState';

const { localStorage } = window;

export default new VuexPersistence({
  storage: localStorage,
  key: 'txp_services_app',
  reducer: (state) => ({
    ...state,
  }),
});
