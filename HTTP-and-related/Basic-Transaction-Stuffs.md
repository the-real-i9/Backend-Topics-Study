> Note: Only concepts that I'm not familiar with until now are touched, to save time.

# Basic Transaction Stuffs
This is characterized by the things that have to do with the basic and usual request/response messages. Things that are not specific to certain concepts, like Connection Management, Authentication, Caching, Proxying, Content negotiation, Conditional Requests etc.

Also the general idea of METHODS, STATUS CODES and HEADERS are dicussed here.

# METHODS
It indicates the purpose for which the client has made this request and what is expected by the client as a successful result. It invokes an action to be applied to a target resource.

It might be futher specialized by some header fields when present in a request, if those header fields do not conflict with the method. For example, a client can send conditional request header fields to make the requested action conditional on the current state of the target resource.

The standardized request methods in HTTP are not resource-specific, since *uniform interfaces provide for better visibility and resuse in network-based systems*. Once defined, a standardized method ought to have the same semantics when applied to any resource, **though each resource determines for itself whether those semantics are implemented or allowed**.

The Methods: `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `CONNECT`, `OPTIONS`, `TRACE`

The *set of methods allowed by a target resource* can be listed in an `Allow` header field. An origin server that recieves a request method that is unrecognized or not implemented should respond with the 501 (Not Implemented) status code.


---
# STATUS CODES

---
# HEADERS