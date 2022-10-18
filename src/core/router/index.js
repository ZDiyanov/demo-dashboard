import Vue from 'vue';
import Router from 'vue-router';
import multiguard from 'vue-router-multiguard';
// eslint-disable-next-line import/no-cycle
import { redirectUnauthenticated, redirectAuthenticated, redirectUnauthorized, redirectFromIndex } from '@/core/router/traps';
import home from '@/core/router/routes/home';
import notFound from '@/core/router/routes/notFound';
import login from '@/core/router/routes/login';
import profile from '@/core/router/routes/profile';
import dashboard from '@/core/router/routes/dashboard';
import catalogue from '@/core/router/routes/catalogue';
import properties from '@/core/router/routes/properties';
import create from '@/core/router/routes/create';
import list from '@/core/router/routes/list';
import clients from '@/core/router/routes/clients';
import starred from '@/core/router/routes/starred';
import settings from '@/core/router/routes/settings';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  saveScrollPosition: true,
  routes: [
    ...home,
    ...notFound,
    ...login,
    ...profile,
    ...dashboard,
    ...catalogue,
    ...properties,
    ...list,
    ...clients,
    ...create,
    ...starred,
    ...settings,
  ],
});

router.beforeEach(
  multiguard([redirectUnauthenticated, redirectAuthenticated, redirectUnauthorized, redirectFromIndex])
);

export default router;
