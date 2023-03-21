import axios from 'axios';
import { servicesUrl, maxItemsPerPage, formatPropertyPayload } from '@/utils/services';

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
      url: `${servicesUrl}/properties`,
      params,
    });
  },
  getItem(id) {
    return axios({
      method: 'get',
      url: `${servicesUrl}/properties/${id}`,
    });
  },
  createItem(nextItem) {
    return axios({
      method: 'post',
      url: `${servicesUrl}/properties`,
      data: { ...formatPropertyPayload(nextItem) },
    });
  },
  updateItem({ id, ...rest }) {
    return axios({
      method: 'put',
      url: `${servicesUrl}/properties/${id}`,
      data: { ...formatPropertyPayload(rest) },
    });
  },
};

export default services;
