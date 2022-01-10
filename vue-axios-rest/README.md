# vue-rest-axios

## Usage
```
import axios from 'axios';
import RestFactory from 'vue-rest-axios';

const instance = axios.create(); // add axios options here
const yourEndpoint = new RestFactory('http://your.url.here/:id/moreurl/', { axiosInstance: instance });
yourEndpoint.get(['id1']);
// or if one id only
yourEndpoint.get('id1');

// options can also be passed
yourEndpoint.get('id', { timeout: 5000 });
```

### Available Functions
  #### delete(ids: inputIds, data: any, config?: AxiosRequestConfig)

  #### get(ids?: inputIds, config?: AxiosRequestConfig)

  #### head(ids?: inputIds, config?: AxiosRequestConfig)

  #### options(ids?: inputIds, config?: AxiosRequestConfig)

  #### patch(ids: inputIds, data: any, config?: AxiosRequestConfig)

  #### post(data: any, config?: AxiosRequestConfig)

  #### put(ids: inputIds, data: any, config?: AxiosRequestConfig)

## Constructor Options
### Url
String to use as base of rest calls
id(s) can be injected using `:id`  
example:  
`www.example.com/something/:id/details`  

### Axios options
`axios` Axios Instance  
`allowParallelRequests` remove endpoint abort trigger when calling while a request is in progress  
`trailingSlash` Force trailing slash on url  

## Outputs
### Status
Status of current endpoint call available on instance via `this.is`  
example:  
`this.is.loading`  
`this.is.loaded`  
`this.is.invalid`  

### Response
Axios response (when available)

### Error
Axios error (when available)



# TODO
## VueX export
- split for state, mutations, actions
## CompositionAPI export
- reactive vars
## Jest
- unit tests
## Cypress
- endpoint tests

# Should I
## allow response adapter as options?
- issues with list vs detail adapters


# API testing source
## zippopatam zip code info
Structure: api.zippopotam.us/country/postal-code
Example: api.zippopotam.us/us/90210
NEW! City->Zip: api.zippopotam.us/country/state/city
Example: api.zippopotam.us/us/ma/belmont
