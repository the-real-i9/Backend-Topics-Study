# Intro
**Cross-Origin Resource Sharing** (CORS) is an HTTP-header based mechanism that allows a **server** to <u>indicate any origins other than its own, **from** which a browser should permit loading its resources.</u> OR *to which a server can serve resources.*

CORS also relies on a mechanism by which browsers (the document origin) make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request.

For example, a document at `https://domain-a.com` uses the Fetch API to make a request to `https://domab-b.com` for data.

**Browsers restrict cross-origin request from scripts**. This means scripts using the <u>Fetch API will use the CORS mechanism to make cross-origin requests</u>. The CORS mechanism <u>supports secure cross-origin requests</u> and data transfers between browsers and servers.

# What request use CORS?
In summary, all implementations of HTML, CSS or the DOM, that can request resources from a URI.

- HTML : `<link>`, `<meta>`, `<img>`, `<audio>`, `<video>`
- CSS : `@font-face`
- DOM : `fetch()`,`{media}.src`, `new {Media}()`

# Functionality
The CORS standard works by adding new **HTTP headers** that <u>let servers describe which origins are permitted to read that information from a web browser.</u>

Additionally, **for HTTP request methods that can cause side-effects on server data**, the specification mandates that <u>browsers "preflight" the request, soliciting supported methods from the server with the HTTP `OPTIONS` request method</u>, and then, upon "approval" from the server, sending the actual request.

Servers can also inform clients whether "credentials" (such as Cookies and HTTP Authentication) should be sent with requests.

# Scenarios
## Simple requests
These are requests that don't trigger a CORS preflight.

The browser sends a request with the `Origin` header, specifying the document's origin
```http
GET /resource HTTP/1.1
Host: https://bar.example
Origin: https://foo.example
```

The server sends back a response with the `Access-Control-Allow-Origin` header.
```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: https://foo.example
```
The `Access-Control-Allow-Origin` header enables CORS on this server.
- A value of **(" `*` ")** indicates that the <u>server allows access from any origin</u>.
- A value specifying **a domain**, indicates that the <u>server restricts access to this domain only</u>. For a different domain the broswer will throw a CORS violation error.

## Preflighted requests
> This is useful in situations where you're not in control of the client app consuming your API.

Unlike simple requests, for "preflighted" requests <u>the browser first sends an HTTP request using the `OPTIONS` method to the resource on the other origin</u>, **in order to determine if the actual request is safe to send**. <u>**Such cross-origin requests are preflighted since they may have implications for user data**</u>.

```http
OPTIONS /resource HTTP/1.1
Host: https://bar.example
Origin: https://foo.example
Access-Control-Request-Method: <!-- Permit Method? -->
Access-Control-Request-Headers: <!-- Permit Header(s)? -->
```
The `Access-Control-Request-Method` header notifies the server as part of a preflight request that when the actual request is sent, it will do so with the specified request method.

The `Access-Control-Request-Headers` header notifies the server that when the actual request is sent, it will do so with the headers specified.

Now **the server** has an opportunity to determine whether it can accept a request under these conditions.

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
```
Notice the server not only agrees or disagrees with the client's conditions, but also specifies which methods are allowed on that resource, along with additional information the client might want to know.

Once the preflight is complete, the real request is sent:
```http
POST /resource HTTP/1.1
Host: https://bar.example
Origin: https://foo.example
Cache-Control: no-cache
```
Notice this real request makes caching decision based on the additional information, `Access-Control-Allow-Max-Age` header.

## Requests with credentials
The most interesting capability exposed by both `fetch` and CORS is the ability to make "credentialed" requests that are aware of HTTP cookies and HTTP Authentication information.

By default, in cross-origin `fetch` invocations, browsers will not send credentials. To enable this, the `withCredentials` boolean property must be set to `true` in the `fetch` options. When this property is set, a `Cookie` or an `Authorization` header should be  inlcuded as credential. Like below:
```js
await fetch("https://bar.example/credentialed-resource",{
  method: 'GET',
  withCredentials: true, 
  headers: { 
    Authorization: `Bearer ${token}`,
  } ,
})
```

Whether or not the `Authorization` or `Cookie` header is included, <u>the browser will reject any response that does not have the `Access-Control-Allow-Credentials : true` header</u>, and not make the response available to invoking `fetch`. This is because `withCredentials` is set to `true`.

```http
GET /credetialed-resource/ HTTP/1.1
Host: https://bar.example
Origin: https://foo.example
Authorization: Bearer fcwtfwfavavGVAV=

HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Credentials: true
```

### Preflight requests and credentials
**CORS-preflight requests** <u>must never include credentials</u>.

**The *response* to a preflight request** <u>must specify `Access-Control-Allow-Credentials: true`</u> to indicate that the actual request can be made with credentials.


### Credentialed requests and wildcards
**When responding to a credentialed request:**\
`Access-Control-Allow-*` <u>headers must not use the wildcard ("` * `") value</u>, but **<u>must state actual allowed values</u>, else, CORS error will be thrown**.

Also note that any `Set-Cookie` response header in a response would not set a cookie if the `Access-Control-Allow-Origin` value in that response is the " `*` " wildcard rather an actual origin.