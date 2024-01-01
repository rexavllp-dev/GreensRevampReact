"use client";
import appConfig from '@/config/appConfig';
import axios from 'axios';
import { Cookies } from 'react-cookie';
// set up cookies
const cookies = new Cookies();

const token = localStorage && localStorage.getItem('accessToken')
const refreshToken = localStorage && localStorage.getItem('refreshToken')

const instance = axios.create({
  baseURL: appConfig.server?.baseUrl || '',
  headers: {
    Authorization: `Bearer ${token}` || '',
  },
});


// instance.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      instance.post('/users/refresh-token', { refresh_token: refreshToken }).then((response) => {
        let newAccessToken = response.data.accessToken;
        let newRefreshToken = response.data.refresh_token;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        localStorage && localStorage.set('accessToken', newAccessToken);
        localStorage && localStorage.set('refreshToken', newRefreshToken);
        return instance(originalRequest);

      }).catch((error) => {
        return Promise.reject(error);
      })
    }

    return Promise.reject(error);
  }
);

export default instance; 