import Vue from 'vue';
import App from '@/views/App';
import router from '@/core/router';
import store from '@/core/store';

import vuetify from '@/core/plugins/vuetify';
import '@/core/plugins/composition';
import '@/core/plugins/casl';
import '@/core/plugins/fragment';
import '@/core/plugins/meta';
import '@/core/plugins/vuelidate';

import '@/components';

// customize config
Vue.config.productionTip = false;

// instantiate app
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
