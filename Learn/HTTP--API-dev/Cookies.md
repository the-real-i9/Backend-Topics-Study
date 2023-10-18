# Cookie
> What are cookies?

Cookies are a mechanism whereby a client and server agrees to attach user identity to requests, so that the server can identify requests from the same user for a certain amout of time, thereby establishing a session for the user.

> How it works?
- The server instructs the client by attaching a `Set-Cookie` response header containing identity information to the response of a request.
- The server stores this identity information in memory as part of the identities it knows about.
- In subsequent requests from the same user, the client attaches a `Cookie` request header containing this identity information (provided it hasn't expired) as instructed by the server.
- The server gets the identity information from the `Cookie` header and checks it through the ones it has in memory to confirm that it knows about it.
- If the server finds a matching identity, it knows that the user has previously visited. This will not be possible without cookies.

The identity information the server attaches and stores in memory should not be ones that expose sensitive user information, therefore, it is usually an ID token (containing gibberish).
- In the server memory, which is believed safe and secure, the server then associates the user's information with this ID token.
- When a matching ID token is found, the server then gets the user information attached to it, and may use it for things like: Authorization, Visits tracking, Reffered websites etc.
