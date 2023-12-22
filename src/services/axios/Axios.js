"use client";
import appConfig from '@/config/appConfig';
import axios from 'axios';
import { Cookies } from 'react-cookie';
// set up cookies
const cookies = new Cookies();


const instance = axios.create({
  baseURL: appConfig.server?.baseUrl || '',
  headers: {
    Authorization: `Bearer ${cookies.get('token') || ''}`,
  },
});

export default instance; 