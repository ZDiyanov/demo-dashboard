export default {
  auth: {
    token: null,
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
  dataSets: {
    items: [],
    setsMeta: {}, // Persist this
  },
  currentSet: {
    activeItem: {},
    items: [],
    itemsMeta: {}
  },
};
