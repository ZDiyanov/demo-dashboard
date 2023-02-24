export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      slug: 'view_auth_login',
      auth: false,
      isAuthView: true,
    },
    component: () => import('@/views/auth/Login'),
  },
];
