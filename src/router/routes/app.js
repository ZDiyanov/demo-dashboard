export default [
  {
    path: '*',
    meta: {
      slug: 'view_app_not_found',
      auth: false,
      isAuthView: false,
    },
    component: () => import('@/views/app/NotFound'),
  },
  {
    path: '/',
    name: 'index',
    meta: {
      slug: 'view_app_home',
      auth: true,
      isAuthView: false,
    },
    component: () => import('@/views/app/Home'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      slug: 'view_app_profile',
      auth: true,
      isAuthView: false,
      // permissions: [{
      //   subject: 'app',
      //   actions: ['view'],
      // }],
    },
    component: () => import('@/views/app/Profile'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      slug: 'view_app_dashboard',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'app',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/app/Dashboard'),
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      slug: 'view_app_settings',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'app',
        actions: ['edit'],
      }],
    },
    component: () => import('@/views/app/Settings'),
  },
];
