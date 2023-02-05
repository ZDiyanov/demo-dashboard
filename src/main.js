import Vue from 'vue';
import App from '@/views/App';
import router from '@/router';
import store from '@/store';

import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import '@/plugins/axios';
import '@/plugins/composition';
import '@/plugins/casl';
import '@/plugins/fragment';
import '@/plugins/meta';
import '@/plugins/vuelidate';

import '@/components';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
