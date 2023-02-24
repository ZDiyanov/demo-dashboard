import isEqual from 'lodash/isEqual';
import { isStr, isObj } from '@/utils';

/**
 * @description Attach CSRF token
 * @param config
 * @param csrfToken
 * @returns {FormData|string}
 */
export const attachCsrfToken = (config, csrfToken) => {
  let requestData = config.data;

  if (isStr(requestData)) {
    // json
    const parsedData = JSON.parse(config.data);
    parsedData['X-CSRF-Token'] = csrfToken;
    requestData = JSON.stringify(parsedData);
  } else if (requestData instanceof FormData) {
    // form data
    requestData.append('X-CSRF-Token', csrfToken);
  } else if (isObj(requestData)) {
    // object
    requestData['X-CSRF-Token'] = csrfToken;
  }

  return requestData;
};

/**
 * @description Replace request token
 * @param request
 * @param nextToken
 * @returns {*}
 */
export const replaceRequestToken = (request, nextToken) => {
  const { headers } = request;

  headers.Authorization = `Bearer ${nextToken}`;

  return {
    ...request,
    headers
  };
};

/**
 * @description Add to request queue
 * @param queue
 * @param config
 * @param resolve
 */
export const addToRequestQueue = (queue, config, resolve) => {
  queue.push(() => resolve(config));
};

/**
 * @description Call postponed requests
 * @param queue
 * @param counter
 */
export const callRequestQueue = (queue, counter) => {
  if (queue.length > 0) {
    const [firstInQueue, ...remainingRequests] = queue;
    firstInQueue();
    queue = remainingRequests;
  }

  if (counter > 0) {
    counter -= 1;
  }
};

/**
 * @description Set CSRF token
 * @param instance
 * @param resHeaders
 */
export const setCsrfToken = (instance, resHeaders) => {
  const csrfToken = resHeaders['x-csrf-token'];

  if (isStr(csrfToken)) {
    instance.defaults.headers.common['X-CSRF-Token'] = header(csrfToken);
  }
};

/**
 * @description Headers
 * @param value
 * @param valueKey
 */
export const header = (value, valueKey) => {
  if (!value || (typeof valueKey !== 'undefined' && !value[valueKey])) {
    return;
  }

  let header = value;

  if (valueKey) {
    header = value[valueKey];
  }

  return header;
};

/**
 * @description Standardize error obj
 * @param res
 * @returns {{statusText}|*}
 */
export const standardizeErrorObj = (res) => {
  res.data.message = res.data.message || res.statusText;
  res.data.data = res.data.data || {};
  res.data.data.message = res.data.data.message || res.data.message;

  return res;
};

/**
 * @description Is unauthenticated error
 * @param res
 * @returns {boolean}
 */
// TODO: Consider using a more strict evaluation, not relying on string comparison
export const isUnauthenticatedErr = (res) => res.status === 401
  && (res.data.data.message === 'Unauthenticated.' || res.data.data.message === 'Unauthorized');

/**
 * @description Call postponed requests
 * @param queue
 */
export const callPostponedRequests = (queue) => {
  queue.forEach(({ callback }) => callback());
  queue = [];
};

/**
 * @description Transform postponed request
 * @param instance
 * @param queue
 * @param request
 * @param resolve
 */
export const transformPostponedRequest = (instance, queue, request, resolve) => {
  const { url, method, params } = request;
  const isUniqueRequest = queue
  .filter(
    (subscriber) => subscriber.url === url
      && isEqual(subscriber.params, params)
      && subscriber.method === method
  )
  .length === 0;

  if (isUniqueRequest) {
    queue.push({
      url,
      method,
      callback: () => {
        const nextRequest = replaceRequestToken(request);
        resolve(instance(nextRequest));
      }
    });
  }
};
