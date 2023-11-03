import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { message } from 'ant-design-vue';
import NProgress from 'nprogress';
import { getLoginUrl, getToken } from '@/utils';

interface ApiError {
  code: number;
  message: string;
}

declare module 'axios' {
  interface AxiosRequestConfig {
    noMessage?: boolean;
    noToken?: boolean;
  }

  interface AxiosInstance {
    (config: AxiosRequestConfig): AxiosPromise<any>;
  }
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000 // 设置请求超时时间
    });

    this.axiosInstance.interceptors.request.use((request) => {
      NProgress.start();
      if (!request.noToken) {
        request.headers['Authorization'] = `Bearer ${getToken()}`;
      }
      return request;
    });

    this.axiosInstance.interceptors.response.use((response) => {
      NProgress.done();
      return response.data || response;
    }, this.handleError);
  }

  private handleError(error: AxiosError<ApiError>): Promise<ApiError> | ApiError {
    NProgress.done();
    if (error.response) {
      const { status, data } = error.response;
      // 响应已接收，但状态码不在 2xx 范围内
      if ([401].includes(status)) {
        message.error('登录失效！请您重新登录');
        window.location.href = getLoginUrl();
      } else if (error.response.data.message && !error.config?.noMessage) {
        message.error(error.response.data.message);
      }
      return Promise.reject(data);
    } else if (error.request) {
      // 请求已发送但未收到响应
      return Promise.reject({
        code: 'network_error',
        message: '网络请求失败，请检查网络连接'
      });
    } else {
      // 其他错误
      return Promise.reject({
        code: 'unknown_error',
        message: '发生未知错误，请重试'
      });
    }
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T, T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<T, T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<T, T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<T, T>(url, config);
  }
}

export default new ApiClient();
