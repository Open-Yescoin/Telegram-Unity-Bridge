import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import axios from 'axios';

/**
 * API Request Config, extends from AxiosRequestConfig
 */
export interface TGMiniAppGameSDKApiClientRequestConfig extends AxiosRequestConfig {}

/**
 * API Response
 * @template T response data type
 */
export interface TGMiniAppGameSDKApiClientResponse<T = unknown> {
  code: number;
  data?: T;
  message?: string;
}

/**
 * API Client
 */
export class TGMiniAppGameSDKApiClient {
  /**
   * Axios Instance
   */
  private readonly instance: AxiosInstance;

  /**
   * White List
   */
  private readonly whiteList = ['/user/login'];

  /**
   * Constructor
   * @param baseURL base url
   */
  constructor(
    readonly baseURL: string,
    readonly projectId: string
  ) {
    this.instance = axios.create({
      baseURL,
      timeout: 60000,
      headers: {
        'TMA-GMC-SDK-PROJECT-ID': projectId
      }
    });

    this.instance.interceptors.request.use(config => {
      // Third Party API
      if (config.baseURL !== this.baseURL) {
        return config;
      }

      // TODO add token to authorization header
      const token = 'token';
      config.headers.Authorization = `Bearer ${token}`;

      if (!token && !this.whiteList.some(path => config.url?.includes(path))) {
        return Promise.reject(new Error('token expired'));
      }

      return config;
    });

    this.instance.interceptors.response.use(
      response => {
        // Third Party API
        if (response.config.baseURL !== this.baseURL) {
          return response.data;
        }

        const gameSdkApiResponse = response.data as TGMiniAppGameSDKApiClientResponse;
        if (gameSdkApiResponse.code === 0) {
          return gameSdkApiResponse.data;
        }

        return Promise.reject(new Error(gameSdkApiResponse.message));
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get HTTP Request
   * @param url url
   * @param config config
   */
  get<T = unknown>(url: string, config?: TGMiniAppGameSDKApiClientRequestConfig) {
    return this.instance.get<unknown, T>(url, config);
  }

  /**
   * Post HTTP Request
   * @param url url
   * @param data data
   * @param config config
   */
  post<T = unknown>(url: string, data?: Record<string, unknown> | null, config?: TGMiniAppGameSDKApiClientRequestConfig) {
    return this.instance.post<unknown, T>(url, data, config);
  }

  /**
   * Put HTTP Request
   * @param url url
   * @param data data
   * @param config config
   */
  put(url: string, data: unknown, config?: TGMiniAppGameSDKApiClientRequestConfig) {
    return this.instance.put(url, data, config);
  }

  /**
   * Delete HTTP Request
   * @param url url
   * @param config config
   */
  del(url: string, config?: TGMiniAppGameSDKApiClientRequestConfig) {
    return this.instance.delete(url, config);
  }
}
