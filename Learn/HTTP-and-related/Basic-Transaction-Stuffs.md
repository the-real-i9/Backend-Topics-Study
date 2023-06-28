> Note: Only concepts that I'm not familiar with until now are touched, to save time.

# Basic Transaction Stuffs
This is characterized by the things that have to do with the basic and usual request/response messages. Things that are not specific to certain concepts, like Connection Management, Authentication, Caching, Proxying, Content negotiation, Conditional Requests etc.

Also the general idea of METHODS, STATUS CODES and HEADERS are dicussed here.

> SHOULD - in the specification means that, according to the semantics, this is what an implementation should follow, but its not strict.\
MUST - in the specification means that, an implementation has to follow this rule strictly.\

> The implementation of these really depends on the backend engineer, the semantics are just what they are originally intended for. Feel free to harmlessly break the rules in your favor.

# METHODS
It indicates the purpose for which the client has made this request and what is expected by the client as a successful result. It invokes an action to be applied to a target resource.

It might be futher specialized by some header fields when present in a request, if those header fields do not conflict with the method. For example, a client can send conditional request header fields to make the requested action conditional on the current state of the target resource.

The standardized request methods in HTTP are not resource-specific, since *uniform interfaces provide for better visibility and resuse in network-based systems*. Once defined, a standardized method ought to have the same semantics when applied to any resource, **though each resource determines for itself whether those semantics are implemented or allowed**.

The Methods: `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `CONNECT`, `OPTIONS`, `TRACE`

The *set of methods allowed by a target resource* can be listed in an `Allow` header field.

An origin server that recieves a request method that is unrecognized or not implemented should respond with the 501 (Not Implemented) status code. An origin server that receives a request method that is recognized and implemented, but not allowed for the target resource, should respond with the 405 (Method Not Allowed) status code.

## Safe Methods
Request methods are considered "safe" if their defined semantics are essentially read-only. The method will not cause any state change on the origin server when applied to a target resource.

The definition of safe methods does not prevent an implementation(server-side program) from including behaviour that breaks this semantic law. What is important, however, is that the client did not request that additional behaviour and cannot be held accountable for it. For example, a safe request initiated by selecting an ad. on the web will often have the side effect of charging an advertising account.

The GET, HEAD, OPTIONS, and TRACE methods fall into this category.

When a resource is constructed such that parameters within the target URI have the effect of selecting an action, it is the resource owner's responsibility to ensure that the action is consistent with the request method semantics.

## Idempotent Methods
A request method is considered "idempotent" if the intended efferct on the server of multiple identical requests with that method is the same as the effect for a single such request.

Safe methods, PUT and DELETE fall into this category.

A server is free to log each request separately, retain a revision control history, or implement other non-idempotent side effects for each idempotent request.

Idempotent methods are distinguished because the request can be repeated automatically if a communication failure occurs before the client is able to rad the server's response. This is fine as reapeating the request will have the same intended effect.

A client should not automatically retry a request with non-idempotent method unless it has some means to know that the request semantics are actually idempotent, regardless of the method, or some means to detect that the original request was never applied.
  - For example, a user agent can repeat a POST request automatically if it knows (through design or configuration) that the request is safe for that resource.
  - Some clients take a riskier approach and attempt to guess when an automatic retry is possible. For example, if the connection was closed before any part of a response is received.

A proxy MUST NOT automatically retry non-idempotent requests.
A client SHOULD NOT automatically retry a failed automatic retry.

## Methods and Caching
For a cache to store and use a response, *the associated method needs to explicitly allow caching and to detail under what conditions a reponse can be used to satisfy subsequent requests;* a method definition that does not do so cannot be cached.

Majority of cache implementations only support GET and HEAD. But, the specification defines caching semantics to include POST.


---
# STATUS CODES


---
# HEADERS

