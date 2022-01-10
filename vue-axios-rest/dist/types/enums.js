export var requestMethods;
(function (requestMethods) {
    // The DELETE method deletes the specified resource.
    requestMethods["DELETE"] = "DELETE";
    // The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
    requestMethods["GET"] = "GET";
    // The HEAD method asks for a response identical to a GET request, but without the response body.
    requestMethods["HEAD"] = "HEAD";
    // The OPTIONS method describes the communication options for the target resource.
    requestMethods["OPTIONS"] = "OPTIONS";
    // The PATCH method applies partial modifications to a resource.
    requestMethods["PATCH"] = "PATCH";
    // The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
    requestMethods["POST"] = "POST";
    // The PUT method replaces all current representations of the target resource with the request payload.
    requestMethods["PUT"] = "PUT";
})(requestMethods || (requestMethods = {}));
export var collectionBlockedRequestMethods;
(function (collectionBlockedRequestMethods) {
    collectionBlockedRequestMethods["PATCH"] = "PATCH";
    collectionBlockedRequestMethods["PUT"] = "PUT";
    collectionBlockedRequestMethods["DELETE"] = "DELETE";
})(collectionBlockedRequestMethods || (collectionBlockedRequestMethods = {}));
export var detailBlockedRequestMethods;
(function (detailBlockedRequestMethods) {
    detailBlockedRequestMethods["POST"] = "POST";
})(detailBlockedRequestMethods || (detailBlockedRequestMethods = {}));
//# sourceMappingURL=enums.js.map