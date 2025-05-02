/**
 * @name api-service
 * @description This service handles all API requests with Axios, including token injection,
 * global error handling, and response normalization for a React + Vite app.
 * @author Yousef Ali
 * @version 2.0
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor: Attaches the access token to request headers.
 */
apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Handles global errors.
 */
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * Simplified API methods.
 */
const api = {
  get: <T = unknown>(url: string, config?: InternalAxiosRequestConfig) =>
    apiClient.get<T>(url, config),
  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ) => apiClient.post<T>(url, data, config),
  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ) => apiClient.put<T>(url, data, config),
  delete: <T = unknown>(url: string, config?: InternalAxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
};

export default api;
