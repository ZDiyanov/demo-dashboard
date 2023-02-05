const { location } = window;

/**
 * @description Services url
 * @type {string}
 */
export const servicesUrl = `${location.protocol}//${process.env.VUE_APP_API}/api`;

/**
 * @description Max items per page
 * @type {string}
 */
export const maxItemsPerPage = process.env.VUE_APP_API_MAX_ITEMS_PER_PAGE;
