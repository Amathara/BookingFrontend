// Creating an API client, using Axios Interceptors:

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  //AxiosResponse,
} from 'axios';

import { tokenManager } from './tokenManager';

// I'm using DummyJSON for temprary api testing.
const API_BASE_URL = 'https://dummyjson.com';

//Create Axios Instance 

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    },
});

//Request interceptor - inject access token

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = tokenManager.getAccessToken();

        if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
    },
    (error: AxiosError)=> {
        return Promise.reject(error);
    }

);
 // Next step is "Implementing the Response Interceptor"
 
export default apiClient;