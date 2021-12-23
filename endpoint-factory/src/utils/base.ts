import { requestMethods } from '@/types/enums';
import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

export interface RestEndpointFactoryOptions {
  axiosInstance: AxiosInstance,
  allowParallelRequests?: Boolean,
}

export interface EndpointInstance {
  axios: AxiosInstance,
  allowParallelRequests: Boolean,
  abortController?: AbortController,
}

export interface EndpointStatus {
  /** currently requesting new data */ 
  loading: Boolean,
  /** has completed first request */ 
  loaded: Boolean,
  /** last request returned error */
  invalid: Boolean,
}

export class RestEndpointFactory {
  url: string;
  methods: requestMethods;
  instance: EndpointInstance;
  is: EndpointStatus;
  response: AxiosResponse | null = null;
  error: AxiosError | null = null;

  constructor(url: string, methods: requestMethods, options: RestEndpointFactoryOptions) {
    this.url = url;
    if (this.url[this.url.length - 1] !== '/') {
      this.url += '/';
    }
    this.methods = methods;
    this.instance = {
      axios: options.axiosInstance,
      allowParallelRequests: options.allowParallelRequests || false,
    };
    this.is = {
      loading: false,
      loaded: false,
      invalid: false,
    }
  }

  async request(method: string, url: string, config: AxiosRequestConfig={}, data=null) {
    let response = null;
    this.is.loading = true;
    try {
      if (this.instance.abortController && !this.instance.allowParallelRequests) {
        this.instance.abortController.abort();
      }
      this.instance.abortController = new AbortController();
      if (data != null) {
        response = axios.request({ ...config, url, data, signal: this.instance.abortController.signal });
      }
      response = axios.request({ ...config, url });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error = error;
      }
      this.is.invalid = true;
      console.error(error);
    }
    this.is.loading = false;
    this.is.loaded = true;
    this.instance.abortController = undefined;
    return response;
  }

  async delete(id: string, data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.DELETE, `${this.url}${id}/`, config, data);
  }

  async get(id?: string, config?: AxiosRequestConfig) {
    return this.request(requestMethods.GET, `${this.url}${id ? id + '/' : ''}`, config);
  }

  async head(id?: string, config?: AxiosRequestConfig) {
    return this.request(requestMethods.HEAD, `${this.url}${id ? id + '/' : ''}`, config);
  }

  async options(id?: string, config?: AxiosRequestConfig) {
    return this.request(requestMethods.OPTIONS, `${this.url}${id ? id + '/' : ''}`, config);
  }

  async patch(id: string, data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.PATCH, `${this.url}${id}/`, config, data);
  }

  async post(data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.POST, `${this.url}`, config, data);
  }

  async put(id: string, data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.PUT, `${this.url}${id}/`, config, data);
  }
}