export default [
  {
    path: '/',
    name: 'index',
    meta: {
      label: 'Home',
      loadState: true,
      auth: true,
      isAuthView: false
    },
    component: () => import('@/views/Home'),
  }
];
