import { AxiosInstance } from "axios";

export interface RestEndpointFactoryOptions {
  axiosInstance: AxiosInstance;
  allowParallelRequests?: boolean;
  trailingSlash: boolean;
}

export interface EndpointInstance {
  axios: AxiosInstance;
  allowParallelRequests: boolean;
  abortController?: AbortController;
}

export interface EndpointStatus {
  /** currently requesting new data */
  loading: boolean;
  /** has completed first request */
  loaded: boolean;
  /** last request returned error */
  invalid: boolean;
}

export type inputIds = string[] | string;
