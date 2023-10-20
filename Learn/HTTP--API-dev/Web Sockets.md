# Intro
Before the advent of WebSockets **HTTP hacks** were used to provide Real-Time communication, with the help of the AJAX (asynchronous JavaScript) feature introduced to the Web architecture.

## AJAX
AJAX is a method of asynchronously exchanging data with a server in the background and updating parts of the web page - without the need for an entire page refresh.

The main technology of AJAX that allows the asynchronous communication is the `XMLHttpRequest` or the new and more sophisticated alternative, the `Fetch` API.

These APIs introduces an intermedairy (an AJAX engine) between the user and the server. Instead of loading the webpage, at the start of the session, the client loads the AJAX engine, which is responsible for:
- Regularly polling the server on the client's behalf.
- Rendering the interface the user sees, and updating it with data retrieved from the server.

## Comet
Comet is a web application design model that allows a web server to push data to the browser.

Unlike classic AJAX, (where the client periodically polls the server for updatas), <u>Comet uses long-lived HTTP connections</u> to allow the server to push updates whenever they're available without the client explicitly requesting them.

To deliver the Comet model, the most well-known techniques were **long polling** and **HTTP streaming**.

### Long polling
Long polling is a technique where <u>the server elects to hold a client's conenction</u> (initiated through the `XMLHttpRequest` or `Fetch`) <u>open for as long as possible, **delivering a response only after data becomes available or a timeout threshold is reached**</u>. 

Upon receipt of the server response, the client usually issues another request immediately, which is also kept open by the server.

### HTTP streaming
HTTP streaming is a data transfer technique that allows a web server to continuously send data to a client over a single HTTP connection that remains open indefinitely.

Whenever there's an update available, the server sends a response, and only closes the connection when explicitly told to do so.

Sever-Sent Events (SSE) is the common way to implement HTTP streaming. 
- SSE is commonly used to send message updates or continous data streams to a browser client. 
- SSE has a W3C standardized JavaScript API, the `EventSource` object, used to connect to the endpoint URL that supplies data when available.


## Limitations of HTTP
Most of the limitations of these HTTP hacks stems from using HTTP as the underlying protocol. The problem is that, <u>HTTP was initially designed to serve hypermedia resources in a request/response fashion</u>. It hadn't been optimized to power realtime apps that usually involve <del>high-frequency or ongoing client-server communicaton</del>, and the <del>ability to react instantly to change</del>.

- **Limited scalability**
  - *High polling frequencies* result in <u>increased network traffic and server demands</u>; this <u>doesn't scale well</u>, especially as the number of concurrent users rises.
  - *Low polling frequencies* will be less taxing on the server, but they may result in <u>delivery of stale information that has lost all or part of its value</u>.
  - *Long polling* is also <u>intensive on the server</u>, and <u>handling thousands of simultaneous long polling requests requires huge amounts of resources</u>.
- **Unreliable message ordering and delivery guarantees**.
  - <u>Multiple HTTP requests from the same client may be in flight simultaneously</u>, and due to various factors such as <u>unreliable network conditions</u>, *there's no guarantee that the requests issued by the client and the responses returned by the server will reach their destination in the right order*.
  - A server may send a response, but <u>network or browser issuses may prevent the message from being successfully received</u>. Unless some sort of message receipt confirmation process is implemented, a subsequent call to the server may result in missed messages.

- **Latency**
  - The <u>time required to establish a new HTTP connection</u> is significant, the handshake involves quite a few back and forth exchanges between the client and the server.
  - In addition to the <u>slow start</u>, HTTP <u>requests are issued sequentially</u>. The next request is only sent once the response to the current request has been received. Depending on network conditions, <u>there can be delays before the client gets a response, and the server receives the next request</u>.
  - *Although HTTP streaming are better for lower latencies* than long polling, <u>HTTP headers increases message size and cause unncessary delays</u>. Often, the HTTP headers in the response outweigh the core data being delivered.

- **No bidirectional streaming**
  - A request/response protocol by design, HTTP doesn't support <del>bidirectional, always on, realtime communication</del> between client and server over the same connection.
  - If some "two-HTTP-connections *hack*" is used, maintaining them introduces significant overhead on the server, because it takes double the resources to serve a single client.


# WebSockets