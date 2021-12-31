import { AxiosInstance } from 'axios';

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

export type inputIds = string[] | string;