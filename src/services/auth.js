import axios from 'axios';
import { servicesUrl } from '@/utils/services';

export const services = {
  login(userAuth) {
    return axios({
      method: 'post',
      url: `${servicesUrl}/auth/login`,
      data: userAuth,
    });
  },
  logout() {
    return axios({
      method: 'post',
      url: `${servicesUrl}/auth/logout`,
    });
  },
  refreshToken({ refresh_token }) {
    return axios({
      method: 'post',
      url: `${servicesUrl}/auth/refresh`,
      data: {
        refresh_token,
      },
    });
  },
};

export default services;
