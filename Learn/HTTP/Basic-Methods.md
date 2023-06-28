## GET
...

A client can alter the semantics of GET to be a "range request", requesting transfer of only some part(s) of the selected representation, by sending a Range header field in the request.

Content recieved in a GET request has no generally defined semantics, cannot alter the meaning or target of the request, and *might lead some implementations to reject the request and close the connection because of its potential as a request smuggling attack*.
  - A client SHOULD NOT generate content in a GET request unless it is made directly to an origin server that has previously indicated, in or out of band, that such a request has a purpose and will be adequately supported.
  - An origin server SHOULD NOT rely on private agreements to receive content, since participants in HTTP communication are often unaware of intermediaries along the request chain.
  - **This paragraph also applies to DELETE.**

The response to a GET request is cacheable; a cache may use it to satisfy subsequent GET and HEAD requests as controlled by the `Cache-Control` header field.

Don't use the GET request method if a sensitive user information is involved in constructing a target URI. Either filter the info, transorm it (hashing) or use the POST request method instead.

### HEAD
HEAD is used to obtain metadata about the selected representation without transferring its representation data, **often for the sake of testing hypertext links or finding recent modifications**.

## POST
The POST method requests that the target resource process the representation enclosed in the request according to the resource's own specific semantics.

An origin server indicates response semantics by choosing an appropriate staus code depending on the result of processing the POST request; *almost all of the status codes defined by the specification could be received in a response to POST, **the exceptions being 206 (Partial Content), 304 (Not Modified), and 416 (Range Not Satisfiable)***

If one or more resources has been created on the origin server as a result of successfully processing a POST request, the origin server SHOULD send a *201 (Created)* response containing a *Location header field* that provides an identifier for the primary resource created and *a representation* that describes the status of the request while referring to the new resource(s).

Responses to POST requests are *only cacheable when they include explicit freshness information and a Content-Location header field that has the same value as the POST's target URI*. **A cached POST response can be reused to satisfy a later GET or HEAD request.** In contrast, a POST request cannot be satisfied by a cached POST response because POST is potentially unsafe.

*If the result of processing a POST would be equivalent to a representation of an existing resource*, an origin server MAY redirect the user agent to that resource by sending a *303 (See Other)* response with the existing resource's identifier in the *Location field*. 


### PUT
The PUT method requests that the state of the target resource be *created or replaced* with the state defined by the representation enclosed in the request message content.

If the PUT creates a resource, use 201 (Created). If it updates a resource, use 200 (OK) or 204 (No Content) to indicate successful completion of the request.

An origin server SHOULD verify that the PUT representation is consistent with its configured constraints for the target resource.
  - When the PUT representation is inconsistent with the target resource, and the origin server has no way around it. An appropriate error message containing sufficient information to explain ehy the representation is unsuitable.
  - The 409 (Conflict) or 415 (Unsupported Media Type) (if applicatble) status codes are suggested.
  - The idea is to implement good error validation and fault tolerance. For example, if a wrong data type can be casted to the right one, do it or raise an error.

An origin server MUST NOT send a validator field, such as an ETag or Last-Modified field, in a successful response to PUT unless the request's representation data was saved without any transformation applied to the content (i.e., the resource's new represetation data is identical to the content received in the PUT request) and the validator field value reflects the new representation. This requirement allows a user agent to know when rhe representation it sent is the result of the PUT, and thus it doesn't need to be retrieved again from the origin server. The new validator(s) received in the response can be used for future conditional requests in order to prevent accidental overwrites.

The PUT implementation can involve versioning. That is, the history of replacements is kept and and can be referenced as a different resource.

Some origin servers support use of the **Content-Range header field** as a request modifier to perform a partial PUT.

Responses to the PUT method are not cacheable. If a successful PUT request passes through a cache that has one or more stored responses for the target URI, those stored responses will be invalidated.\
**This also applies to DELETE**.



### DELETE
The DELETE method requests that the origin server remove the association between the target resource and its current functionality.

If a DELETE method is successfully applied, the origin server SHOULD send
  - 202 (Accepted) if the action will likely succeed but has not yet been enacted.
  - 204 (No Content) if the action has been enacted and no further information is to be supplied
  - 200 (OK) if the action has been enacted and the response message includes a representation describing the status.

### OPTIONS
The OPTIONs method requests informatin about the communications options available for the target resource, at either the oringin server or an intervening intermediary. **This method allows a client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action.**

An OPTIONS request wih an asterisk ("*") as the request target applies to the server in general rather than to a specific resource. **The "\*" request is only useful as a "ping" or "no-op" type of method; it does nothing beyond allowing the client to test the capabilities of the server**. For example, this can be used to test a proxy for HTTP/1.1 conformance.

If not "\*", it applies to the options that are available when communication with the target resource.

A server should respond by sending any header that might indicate optional features implemented by server and applicable to the target resource (e.g., Allow). The response content, if any, might also describe the communication options in a machine or human-readable representation.

A client MAY send **a Max-Forwards header field in an OPTIONS request to target a specific recipient in the request chain**. A proxy must not do this, unless it receives one from the client.