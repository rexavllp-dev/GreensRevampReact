import appConfig from '@/config/appConfig';
import axios from 'axios';

const instance = axios.create({
  baseURL: appConfig.server?.baseUrl || '',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

export default instance; 