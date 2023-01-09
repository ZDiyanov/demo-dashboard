export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      loadState: true,
      auth: false,
      isAuthView: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login'),
  },
];
