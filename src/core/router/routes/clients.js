export default [
  {
    path: '/clients',
    name: 'clients',
    meta: {
      label: 'My Clients',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "clients" */'@/views/Clients'),
  },
];
