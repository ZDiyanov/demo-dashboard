import Vue from 'vue';
import Router from 'vue-router';
import multiguard from 'vue-router-multiguard';
// eslint-disable-next-line import/no-cycle
import { redirectUnauthenticated, redirectAuthenticated, redirectUnauthorized, redirectFromIndex } from '@/router/traps';
import auth from '@/router/routes/auth';
import app from '@/router/routes/app';
import properties from '@/router/routes/properties';
import clients from '@/router/routes/clients';
import brokers from '@/router/routes/brokers';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  saveScrollPosition: true,
  routes: [
    ...auth,
    ...app,
    ...properties,
    ...clients,
    ...brokers,
  ],
});

router.beforeEach(
  multiguard([redirectUnauthenticated, redirectAuthenticated, redirectUnauthorized, redirectFromIndex])
);

export default router;
