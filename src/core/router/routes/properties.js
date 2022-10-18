export default [
  {
    path: '/properties',
    name: 'properties',
    meta: {
      label: 'My Properties',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "properties" */'@/views/Properties'),
  },
  {
    path: '/property/:id',
    name: 'property',
    meta: {
      label: 'Property',
      loadState: true,
      auth: true,
      isAuthView: false,
    },
    component: () => import(/* webpackChunkName: "properties" */'@/views/Property'),
    props: true,
  },
];
