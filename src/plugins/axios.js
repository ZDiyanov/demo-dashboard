import Vue from 'vue';
import axios from 'axios';
import { isObj } from '@/utils';
import {
  attachCsrfToken,
  replaceRequestToken,
  addToRequestQueue,
  callRequestQueue,
  setCsrfToken,
  standardizeErrorObj,
  isUnauthenticatedErr,
  callPostponedRequests,
  transformPostponedRequest,
} from '@/utils/axios';
import store from '@/store';

const maxParallelRequests = process.env.VUE_APP_API_MAX_PARALLEL_REQUESTS;
const postponedRequestsDelay = 500; // ms
const refreshSubscribers = [];
let parallelRequests = 0;
const requestQueue = [];
let isFetchingAccessToken = false;

/**
 * @description Request interceptor
 * @param config
 * @returns {*}
 */
const requestInterceptor = (config) => {
  const augmentedConfig = { ...config };

  if (config.method !== 'get') {
    const csrfToken = axios.defaults.headers.common['X-CSRF-Token'];
    augmentedConfig.data = attachCsrfToken(config, csrfToken);
  }

  const nextConfig = replaceRequestToken(augmentedConfig, store.getters['auth/token'].access_token);

  if (parallelRequests < maxParallelRequests) {
    parallelRequests += 1;
    return nextConfig;
  }

  // add request to request queue
  return new Promise((resolve) => (
    addToRequestQueue(requestQueue, nextConfig, resolve)
  ));
};

/**
 * @description Response success handler
 * @param res
 * @returns {*}
 */
const responseSuccessHandler = (res) => {
  // TODO: Errors should not fall through the axios global error handler to the success handler. Investigate and implement a better solution
  // handle errors that leak through
  if (res.data.status === 'error') {
    console.log(res);
    // return responseErrorHandler({
    //   response: res,
    //   config: res.config
    // });
  }

  callRequestQueue(requestQueue, parallelRequests);
  setCsrfToken(axios, res.headers);

  return res;
};

/**
 * @description Response error handler
 * @param err
 * @returns {*}
 */
const responseErrorHandler = (err) => {
  const isLogged = store.getters['auth/isLogged'];
  callRequestQueue();

  // handle generic error
  if (!isObj(err.response) || !isObj(err.response.data)) {
    // handleAlerts({
    //   data: {
    //     message: 'Network error. Please try again.'
    //   }
    // }).catch((err) => err);
    console.log('Network error. Please try again.');

    return Promise.reject(err);
  }

  // standardize response
  const res = standardizeErrorObj(err.response);

  // handle authenticated/authorized/public error
  if (!isUnauthenticatedErr(res)) {
    // handleAlerts({
    //   data: res.data,
    //   params: res.config.params || res.config.data
    // }).catch((err) => err);
    console.log(res);
    return Promise.reject(err);
  }

  // handle unauthenticated/unauthorized error
  if (!isFetchingAccessToken && isLogged) {
    isFetchingAccessToken = true;

    // attempt to refresh token
    const query = {
      refresh_token: store.getters['auth/token'].refresh_token,
    };
    store.dispatch('auth/refreshToken', query)
      .then(() => (
        // delay calling postponed requests, to give the server some time to refresh the token
        setTimeout(() => {
          isFetchingAccessToken = false;
          callPostponedRequests(refreshSubscribers);
        }, postponedRequestsDelay)
      ))
      .catch(() => (
        store.dispatch('auth/redirectInvalidToken')
      ));
  }

  // postpone all requests while refreshing token
  return new Promise((resolve) => (
    // transformPostponedRequest(err.config, resolve)
    transformPostponedRequest(axios, refreshSubscribers, err.config, resolve)
  ));
};

export const plugin = {
  install: () => {
    // use custom interceptor
    axios.interceptors.request.use(
      requestInterceptor,
    );

    // use custom response handlers
    axios.interceptors.response.use(
      responseSuccessHandler,
      responseErrorHandler,
    );
  },
};

Vue.use(plugin);

export default plugin;
