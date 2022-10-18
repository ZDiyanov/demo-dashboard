export default [
  {
    path: '/starred',
    name: 'starred',
    meta: {
      label: 'Starred',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "starred" */'@/views/Starred'),
  },
];
