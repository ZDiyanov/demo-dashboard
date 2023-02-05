export default {
  auth: {
    token: {},
    user: {},
    role: {},
    permissions: [],
    redirects: {
      index: '/',
      unauthenticated: '/login',
      authenticated: '/dashboard'
    }
  },
  locale: {
    language: 'en'
  },
  config: {
    languages: [],
  },
  properties: {
    activeItem: {},
    items: [],
    itemsMeta: {},
  },
  clients: {
    activeItem: {},
    items: [],
    itemsMeta: {},
  },
  brokers: {
    activeItem: {},
    items: [],
    itemsMeta: {},
  },
};
