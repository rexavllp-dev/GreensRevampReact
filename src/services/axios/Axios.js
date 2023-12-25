"use client";
import appConfig from '@/config/appConfig';
import axios from 'axios';
import { Cookies } from 'react-cookie';
// set up cookies
const cookies = new Cookies();

const token = cookies.get('accessToken');
const refreshToken = cookies.get('refreshToken');
console.log(token)
console.log(refreshToken)


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
        cookies.set('accessToken', newAccessToken);
        cookies.set('refreshToken', newRefreshToken);
        return instance(originalRequest);

      }).catch((error) => {
        return Promise.reject(error);
      })
    }

    return Promise.reject(error);
  }
);

export default instance; 