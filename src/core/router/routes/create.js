export default [
  {
    path: '/create',
    name: 'create',
    meta: {
      label: 'Create New Property',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "create" */'@/views/Create'),
  },
];
