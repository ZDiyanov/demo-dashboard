export default [
  {
    path: '*',
    meta: {
      loadState: true,
      auth: false,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound'),
  },
];
