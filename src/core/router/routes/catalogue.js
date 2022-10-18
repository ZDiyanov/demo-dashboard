export default [
  {
    path: '/catalogue',
    name: 'catalogue',
    meta: {
      label: 'Catalogue',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "catalogue" */'@/views/Catalogue'),
  },
];
