export default [
  {
    path: '*',
    meta: {
      auth: false,
      isAuthView: false,
    },
    component: () => import('@/views/app/NotFound'),
  },
  {
    path: '/',
    name: 'index',
    meta: {
      label: 'Home',
      auth: true,
      isAuthView: false,
    },
    component: () => import('@/views/app/Home'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      label: 'Profile',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'app',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/app/Profile'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      label: 'Dashboard',
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
      label: 'Settings',
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
