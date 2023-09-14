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

---

> What is Authentication?

Authentication is user login.
- A mechanism that verifies that a user is a registered user of an application, so that it can access protected resources.
- It is done by the user in the UI, and it is followed by Authorization.

> What is Authorization?

Authorization is a mechanism that controls user access to protected resources on the server.
- Before a user accesses a protected resource, it has to be authorized by its credentials, the ones which were provided at authentication.
- It is done via the `Authorization` header.


# Cookie Auth
Most has already been covered in the previous section.

After a user is authenticated and a session is established for the user via a cookie. Necessary user information can be attached to the stored ID token in the server's memory.

When the client attaches a `Cookie` header in the request to a protected resource, it is an authorization technique - but not the standard. Since the ID token is provided and it is associated with the user's credential in the server's memory.

# Basic Auth
When the user is authenticated via login.

The server encrypts the user's credentials (with some additional information) into a token, and sends it back to the client.

The client then uses the token to authorize the user on subsequent requests to a protected resource.

The server can decrypt this token on its end, and checks the user's information. Some of the additional information can include the `max-age` of the token that the server will check, so the client isn't logged in forever, and will have to re-authenticate itself.
