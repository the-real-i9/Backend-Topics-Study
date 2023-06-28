> NOTE: Only concepts that I'm not familiar with till this point are documented.

# Messages
In HTTP/2, the once human-readale message is now divided up into HTTP frames, providing optimization and perfomance improvements.

Web developers, rarely craft textual HTTP messages themselves: *software*, *a Web browser*, *proxy*, or *Web server*, perform this action. They provide HTTP messages through _**config files (for proxies or servers)**_, _**APIs (for browsers)**_, or other instances.

The HTTP/2 binary framing mechanism has been designed to not require any alteration of the APIs or config files applied: it is broadly transparent to the user.

The **start-line and HTTP headers** of the HTTP message are collectively known as the _**head**_ of requests, whereas its **payload** is known as the _**body**_.

## HTTP Requests
Messages sent by the client to initiate an action on the server.
> Start line:
- **Request target:** usually a URL, or the absolute path of the protocol, port, and domain. *It is are usually **characterized by the request context***.

  - An absolute path, ultimately followed by a `'?'` and query string. This is the most common form, known as the _**origin form**_, and is **used with `GET`, `POST`, `HEAD`, and `OPTIONS` methods**.
  ```
  GET /test.html?query=alibaba HTTP/1.1
  ```

  - A complete URL, known as the _**absolute form**_, is **mostly used with `GET` _when connected to a proxy_**.
  ```
  GET https://developer.mozilla.org/en-US/docs/Web/HTTP/Messaegs HTTP/1.1
  ```

  - The authority component of a URL, *consisting of the domain name and optionally the port (prefixed by a `':'`)*, is called the _**authority form**_. It is **only used with `CONNECT` when setting up an HTTP tunnel**.
  ```
  CONNECT developer.mozilla.org:80 HTTP/1.1
  ```

  - The _**asterik form**_, a simple asterisk (`'*'`) is **used with `OPTIONS`, representing the server as a whole**.
  ```
  OPTIONS * HTTP/1.1
  ```

> Headers:
General headers, Request headers, Response headers, Representatinal headers(body information).

> Body:
- Single-resource bodies (single data/file). Data type of form type/sub-type e.g. text/plain, application/javascript
- Multiple-resource bodies (multipart body e.g. form datas). Data type of form multipart/* e.g. multipart/formdata

## HTTP Resposes
> Body:
- Single-resource bodies, consisting of **a single file of known length**.
- Single-resource bodies, consisting of **a single file of unknown length, encoded by chunks with `{Transfer-Encoding: chunked}` header prop**.
- Multiple-resource bodies, consisting of a multipart body. They are rare for HTTP responses.

## HTTP/2 Frames
HTTP/1.x messages have a few drawbacks for perfomance:
- Headers, unlike bodies, are uncompressed.
- Headers are often very similar from one message to the next one, yet still repeated across connections.
- No multiplexing can be done. Several connections need opening on the same server: and warm TCP connections are more efficient than cold ones.

HTTP/2 introduces an extra step:
  - It divides HTTP/1.x messages into frames which are embedded in a stream.
  - Data and header frames are separated, which allows header compression.
  - Several streams can be combined together, a process called *multiplexing*, allowing more efficient use of underlying TCP connections.

---
---

# Request Line
Consist of: [Method] [Request Target] [HTTP Version]
## Request Target
There are four dinstict formats for the request-target, depending on both the method being requested and whether the request is to a proxy.

* Origin-form: When making a request directly to an origin server, **a client must send only the absolute path and query components of the target URI** as the request-target.

* Absolute-form: When making a request to a proxy, a client must send the target URI in "absolute-form" as the request-target.
  - A server must accept the absolute-form in requests even though most HTTP/1.1 clients will only send the absolute-form to a proxy.

* Authority-form: The "authority-form" of request-target is **only used for CONNECT requests to establish a tunnel through one or more proxies**. It *consists of only the uri-host and port number of the tunnel destination, separated by a colon*.
  - The client obtains the host and port from the target URI's authority component, except that it sends the scheme's default port if the port is absent in the target URI.

* Asterisk-form: When a client wishes to request OPTIONS from the server as a whole, the client must send only `"*"` as the request-target.
  - *If a proxy receives an OPTIONS request with an absolute-form of request-target in which the URI has an empty path and no query component component*, then **the last proxy on the request chain must send a request-target of `"*"` when it forwards the request to the indicated origin server**.

## Message body
The message body is identical to the content unless a *transfer coding* has been applied.

### Transfer-Encoding

The Transfer-Encoding header field lists the transfer coding names corresponding to the sequence of transfer codings that have been (or will be) applied to the content in order to form the message body.

It is **primarily intended to accurately delimit dynamically generated content**. It also serves to distinguish encodings that are only applied in transit from the encodings that are a characteristic of the selected representation.