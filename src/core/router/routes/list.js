export default [
  {
    path: '/list',
    name: 'list',
    meta: {
      label: 'Client List',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "list" */'@/views/List'),
  },
];
