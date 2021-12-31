# vue-rest-axios

## Constructor Options
### Url
String to use as base of rest calls
id(s) can be injected using `:id`  
example:  
`www.example.com/something/:id/details`  

### Axios options
`axios` Axios Instance  
`allowParallelRequests` remove endpoint abort trigger when calling while a request is in progress  

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




