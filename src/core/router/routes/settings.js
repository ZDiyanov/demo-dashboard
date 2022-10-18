export default [
  {
    path: '/settings',
    name: 'settings',
    meta: {
      label: 'Settings',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "settings" */'@/views/Settings'),
  },
];
