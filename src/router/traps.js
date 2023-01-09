// eslint-disable-next-line import/no-cycle
import store from '@/store';
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import { isArr } from '@/utils';

/**
* @description Is matching
* @param path
* @param urlParts
* @returns {boolean}
*/
const isMatching = (path, ...urlParts) => {
  let hasMatch = false;

  urlParts.forEach(urlPart => {
    if (hasMatch) {
      return false;
    }

    hasMatch = path.indexOf(urlPart) > -1;
  });

  return hasMatch;
};

/**
* @description Requires authentication
* @param to
* @returns {boolean}
*/
const requiresAuth = (to) => to.matched.some(record => record.meta.auth);

/**
* @description Is authentication route
* @param path
* @returns {boolean}
*/
const isAuthRoute = (path) => isMatching(path, 'login');

/**
* @description Is logged
* @returns {*}
*/
const isLogged = () => store.getters['auth/isLogged'];

/**
* @description Is authorized
* @param to
* @returns {*}
*/
const isAuthorized = (to) => (
  router.app.$store.getters['auth/isAuthorized'](to.meta.permissions)
);

/**
* @description Has permissions
* @param to
* @returns {boolean}
*/
const hasPermissions = (to) => isArr(to.meta.permissions);

/**
* @description Get redirects
* @returns {*}
*/
const getRedirects = () => (
  router.app.$store.getters['auth/redirects']
);

/**
* @description Redirect unauthorized
* @param to
* @param from
* @param next
*/
export const redirectUnauthorized = (to, from, next) => {
  if (!hasPermissions(to) || isAuthorized(to)) {
    return next();
  }

  const { index } = getRedirects();
  next(index);
};

/**
* @description Redirect unauthenticated
* @param to
* @param from
* @param next
*/
export const redirectUnauthenticated = (to, from, next) => {
  const { index, unauthenticated, authenticated } = getRedirects();

  if (requiresAuth(to) && !isLogged()) {
    next(unauthenticated);
  } else if (to.path === index) {
    next(authenticated);
  } else {
    next();
  }
};

/**
* @description Redirect authenticated
* @param to
* @param from
* @param next
*/
export const redirectAuthenticated = (to, from, next) => {
  const { index } = getRedirects();

  if (isAuthRoute(to.path) && isLogged()) {
    return next(index);
  }

  next();
};

/**
* @description Redirect from index
* @param to
* @param from
* @param next
*/
export const redirectFromIndex = (to, from, next) => {
  const { index, authenticated } = getRedirects();

  if (to.path === index) {
    return next(authenticated);
  }
  next();
};
