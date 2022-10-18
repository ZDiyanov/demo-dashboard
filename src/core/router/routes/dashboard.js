export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      label: 'Dashboard',
      loadState: true,
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'dashboard',
        actions: ['view']
      }],
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard'),
  },
];
