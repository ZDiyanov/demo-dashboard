export default [
  {
    path: '/brokers',
    name: 'brokersList',
    meta: {
      slug: 'view_broker_list',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'user',
        actions: ['list-all'],
      }],
    },
    component: () => import('@/views/brokers/List'),
  },
  {
    path: '/brokers/archive',
    name: 'brokersArchive',
    meta: {
      slug: 'view_brokers_archive',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'user',
        actions: ['list-all'],
      }],
    },
    component: () => import('@/views/brokers/Archive'),
  },
  {
    path: '/broker/:id',
    name: 'broker',
    meta: {
      slug: 'view_broker',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'user',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/brokers/Single'),
  },
  {
    path: '/brokers/create',
    name: 'brokerCreate',
    meta: {
      slug: 'view_broker_create',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'user',
        actions: ['store'],
      }],
    },
    component: () => import('@/views/brokers/Create'),
  },
];
