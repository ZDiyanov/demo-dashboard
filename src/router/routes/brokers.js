export default [
  {
    path: '/brokers',
    name: 'brokersList',
    meta: {
      label: 'Brokers List',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'brokers',
        actions: ['list'],
      }],
    },
    component: () => import('@/views/brokers/List'),
  },
  {
    path: '/broker/:id',
    name: 'broker',
    meta: {
      label: 'Broker',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'brokers',
        actions: ['view'],
      }],
    },
    component: () => import('@/views/brokers/Single'),
  },
  {
    path: '/brokers/create',
    name: 'brokerCreate',
    meta: {
      label: 'Create New Broker',
      auth: true,
      isAuthView: false,
      permissions: [{
        subject: 'brokers',
        actions: ['create'],
      }],
    },
    component: () => import('@/views/brokers/Create'),
  },
];
