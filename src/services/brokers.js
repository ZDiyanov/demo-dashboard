import axios from 'axios';
import { servicesUrl, maxItemsPerPage, formatBrokerItem } from '@/utils/services';

export const services = {
  getItems(options = {}) {
    const {
      page = 1,
      perPage = maxItemsPerPage,
      sort = '',
      order = 'asc',
      search = '',
    } = options;

    const params = {
      page,
      sort,
      order,
      search,
      per_page: perPage,
    };

    if (perPage > -1) {
      params.per_page = perPage;
    }

    return axios({
      method: 'get',
      url: `${servicesUrl}/users`,
      params,
    });
  },
  createItem(nextItem) {
    return axios({
      method: 'post',
      url: `${servicesUrl}/users`,
      data: { ...formatBrokerItem(nextItem) },
    });
  },
  updateItem() {},
};

export default services;
