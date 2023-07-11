# Status codes
> Informational
## 100 (Continue)
When the request contains an Expect header field that includes a 100-continue, the response indicates that the server wishes to receive the request content.

To have the server check the request's headers, a vlient must send Excep: 100-continue as a header in its initial request and receive a 100 Continue response before sending the body.

> Success
## 200 (OK)
Indicates that the request method's intention has succeeded with a proof that it has.
  - GET: The resource has been fetched and is transmitted in the message body.
  - HEAD: The representation headers are included in the response without any message body.
  - POST: The resource describing the result/status of the action is transmitted in the message body.
  PUT, DELETE: The status of the action in the message body.
  - OPTIONS: Communication options for the target resource.
  - TRACE: The message body contains the request message as received by the server returning the trace.

A 200 (OK) response is cacheable by default.

In 200 reponses to GET or HEAD, an origin server SHOULD send any available validator fields for the selected representation, with both a strong **E-tag** and a **Last-Modified** date being preferred.

In 200 responses  to state-changing methods, any validator fields sent in the response convey the current validators for the new representation formed as a result of successfully applying the request semantics.

## 201 (Created)
Indicates that **the request has succeeded and has led to the creation of a resource**. The new resource, or a description and link to the new resource, is effectively created before the response is sent back and the newly created items are returned in the body of the message, located at either the URL of the request, or at the URL in the value of the Location header.

## 202 (Accepted)
Indicated that the request has merely been accepted for processing.

This is used in a situation where the client is not concerned with the processing and result of the request. The server might consider the request or discard it.

## 203 (Non-Authoritative Information)
Indicates that **the request was successful but the enclosed payload has been modified by a transforming proxy** from that of the origin server's 200 (OK) response.

## 204 (No Content)
Indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page or there is no additional content to send in the response content.

Metadata in the response header fields refer to the target resource and its selected representation after the requested action was applied. For example, if a 204 code is received in response to PUT, the response contains an ETag field, then the PUT was successful ans the ETag field value contains the entity tag for the new representation of that target resource.

The server assumes that the user agent will provide some indication of the success to its user, in accord with its own interface, and apply any new or updated metadata in the response to its active representation.

A 204 response is cacheable by default.


> Redirects
## 303 See Other
Indicates that the server is redirecting the user agent to a different resource, which is intended to provide an indirect response to the original request.

The new URI is indidated in the Location header field and it doesn't have to be equivalent to the target URI.

It is applicable to any HTTP method.

The representation of a 303 response ought to contain a short hypertext note with a hyperlink to the same URI reference provided in the Location header field.

## 304 Not Modified
Indicates that, there is no need to retransmit the requested resource because it is cached and it is served from there - OR - there is no need to transmit the requested resource because the modification conditional request is false.

In other words, there is no need for the server to transfer a representation of the target resource because the request indicates that the client, which made the request conditional, already has a valid representation; the server is therefore redirecting the client to make use of that stored representation as if it were the content of a 200 (OK) response.

> Errors
## 400 (Bad Request)
Indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).

## 401 (Unauthorized)
Indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.

## 403 (Forbidden)
Indicates that the server understands the request but refuses to authorize it. The access is tied to the application logic, such as insufficient rights to a resource.

## 405 Method Not Allowed
Indicates that the server knows the request method, but the target resource doesn't support this method.

The server MUST generate an Allow header field in a 405 status code response. The field must contain a list of methods that the target resource currently supports.

## 407 (Proxy Authentication Required)
Indicates that the request has not been applied because it **lacks valid authentication credentials for a proxy server** that is between the browser and the server that can access the requested resource.

The status is sent with a Proxy-Authenticate header that contains information on how to authorize correctly.

## 409 (Confict)
Indicates a request conflict with the current state of the target resource.

Conflicts are most likely to occur in response to a PUT request. For example, you may get a 409 response when uploading a file that is older than the existing one on the server, resulting in a version control conflict.

## 410 (Gone)
Indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.

It is cacheable by default.

## 411 (Length Required)
Indicates that the **server refuses to accept the request without a defined Content-Length header**.

## 412 (Precondition Failed)
Indicates that access to the target resource has been denied. This happens with *conditional requests **on methods other than GET or HEAD** when the condition defined is not fulfilled*.

For example, when the condition defined by the `If-Unmodified-Since` or `If-None-Match` headers is not fulfilled. In that case, the request, usually an upload or a modification of a resource, cannot be made and this error response is sent back.

Also, with the help of the `ETag` and the `If-Match` headers, you can detect mid-air edit collisions. When saving changes to a document with POST request the If-Match will contain the ETag value to check freshness against. If the values don't match, it means that the document has been edited and a 412 error is thrown.


## 413 (Payload Too Large)
Indicates that the request entity is larger than limits defined by server; the server might close the connection or return a `Retry-After` header field.

## 414 (URI Too Long)
Indicates that the URI requested by the client is longer than the server is willing to interpret.

## 415 (Unsupported Media Type)
Indicates that the server refuses to accept the request because the payload format is in an unsupported format.

Any response header fields indicating the accepted format should be sent.

## 416 (Range Not Satisfiable)
Indicates that **a server cannot serve the requested ranges**. The most likely reason is that the document doesn't contain such ranges, or that the Range header value, though syntactically correct, doesn't make sense.

## 417 (Expectation Failed)
Indicates that the expectation given in the request's Expect header could not be met.

The server will return this in contrast to a 100-Continue, which is expected, if the client should not proceed to send the representation.

## 422 (Unprocessable Entity)
Indicates that the *server understands the content type of the request entity*, *and the syntax of the request entity is correct*, **but it was unable to process the contained instructions**.

## 425 (Too Early)
Indicates that **the server is unwilling to risk processing a request that might be replayed, which creates the potential for a replay attack**.

## 426 (Upgrade Required)
Indicates that the server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.

The server sends an `Upgrade` with this response to indicate the required protocol(s).

## 428 (Precondition Required)
Indicates that the server requires the request to be conditional.

Typically, this means that a required precondition header, such as `If-Match`, is missing.

## 429 (Too Many Requests)
Indicates the user has sent too many requests in a given amount of time **("rate limiting")**.

A `Retry-After` header might be included to this response indicating how long to wait before making a new request.