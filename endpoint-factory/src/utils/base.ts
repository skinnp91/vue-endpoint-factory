import { requestMethods } from "@/types/enums";
import type {
  RestEndpointFactoryOptions,
  EndpointInstance,
  EndpointStatus,
  inputIds,
} from "@/types";
import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  Method,
} from "axios";

export default class RestEndpointFactory {
  url: string;
  instance: EndpointInstance;
  is: EndpointStatus;
  response: AxiosResponse | null = null;
  error: AxiosError | null = null;

  constructor(url: string, options: RestEndpointFactoryOptions) {
    this.url = url;
    if (this.url[this.url.length - 1] !== "/" && options.trailingSlash) {
      this.url += "/";
    }
    this.instance = {
      axios: options.axiosInstance,
      allowParallelRequests: options.allowParallelRequests || false,
    };
    this.is = {
      loading: false,
      loaded: false,
      invalid: false,
    };
  }

  getUrl(ids: inputIds = []) {
    let wrappedIds: string[] = ids as [];
    if (typeof ids === "string" || ids instanceof String) {
      wrappedIds = [ids as string];
    }
    const idsToReplace = (this.url.match(/:id/g) || []).length;
    if (idsToReplace && idsToReplace !== wrappedIds.length) {
      throw new Error(
        `${idsToReplace} id(s) required for this url: ${this.url}`
      );
    }
    if (idsToReplace) {
      let finalUrl = this.url;
      wrappedIds.forEach((id) => (finalUrl = finalUrl.replace(":id", id)));
      return finalUrl;
    }
    if (wrappedIds.length === 1) {
      return `${this.url}${wrappedIds[0]}/`;
    }
    return this.url;
  }

  async request(
    method: Method,
    url: string,
    config: AxiosRequestConfig = {},
    data = null
  ) {
    console.log(this);
    this.is.loading = true;
    try {
      if (
        this.instance.abortController &&
        !this.instance.allowParallelRequests
      ) {
        this.instance.abortController.abort();
      }
      this.instance.abortController = new AbortController();
      if (data != null) {
        this.response = await axios.request({
          ...config,
          method,
          url,
          data,
          signal: this.instance.abortController.signal,
        });
      } else {
        this.response = await axios.request({
          ...config,
          url,
          signal: this.instance.abortController.signal,
        });
      }
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
    return this.response;
  }

  async delete(ids: inputIds, data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.DELETE, this.getUrl(ids), config, data);
  }

  async get(ids?: inputIds, config?: AxiosRequestConfig) {
    return this.request(requestMethods.GET, this.getUrl(ids), config);
  }

  async head(ids?: inputIds, config?: AxiosRequestConfig) {
    return this.request(requestMethods.HEAD, this.getUrl(ids), config);
  }

  async options(ids?: inputIds, config?: AxiosRequestConfig) {
    return this.request(requestMethods.OPTIONS, this.getUrl(ids), config);
  }

  async patch(ids: inputIds, data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.PATCH, this.getUrl(ids), config, data);
  }

  async post(data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.POST, this.getUrl(), config, data);
  }

  async put(ids: inputIds, data: any, config?: AxiosRequestConfig) {
    return this.request(requestMethods.PUT, this.getUrl(ids), config, data);
  }
}
