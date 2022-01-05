export enum requestMethods {
  // The DELETE method deletes the specified resource.
  DELETE = "DELETE",

  // The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
  GET = "GET",

  // The HEAD method asks for a response identical to a GET request, but without the response body.
  HEAD = "HEAD",

  // The OPTIONS method describes the communication options for the target resource.
  OPTIONS = "OPTIONS",

  // The PATCH method applies partial modifications to a resource.
  PATCH = "PATCH",

  // The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
  POST = "POST",

  // The PUT method replaces all current representations of the target resource with the request payload.
  PUT = "PUT",
}

export enum collectionBlockedRequestMethods {
  PATCH = requestMethods.PATCH,
  PUT = requestMethods.PUT,
  DELETE = requestMethods.DELETE,
}

export enum detailBlockedRequestMethods {
  POST = requestMethods.POST,
}
