import axios from 'axios';
import { servicesUrl, maxItemsPerPage, formatClientItem } from '@/utils/services';

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
      url: `${servicesUrl}/clients`,
      params,
    });
  },
  getItem(id) {
    return axios({
      method: 'get',
      url: `${servicesUrl}/clients/${id}`,
    });
  },
  createItem(nextItem) {
    return axios({
      method: 'post',
      url: `${servicesUrl}/clients`,
      data: { ...formatClientItem(nextItem) },
    });
  },
  updateItem({ id, ...rest }) {
    return axios({
      method: 'put',
      url: `${servicesUrl}/clients/${id}`,
      data: { ...formatClientItem(rest) },
    });
  },
};

export default services;
