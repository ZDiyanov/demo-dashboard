export default [
  {
    path: '/profile',
    name: 'profile',
    meta: {
      label: 'Profile',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "profile" */'@/views/Profile'),
  },
];
