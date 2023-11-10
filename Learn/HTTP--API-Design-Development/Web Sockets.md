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

> HTTP interaction is unidirectional, as the client initiates the request, and the server responds to it. However, <u>HTTP itself doesn't provide a built-in mehcanism for the sever to spontaneously send data to the client **without prior request**</u>.\
> Take for example, chatting a bot, it doesn't give you a response on its own unless you've messaged it. It's an *action-reaction* situation. The communication isn't successful without a reaction to the action.\
\
> A bidirectional communication allows both client and server to send messages to each other at will. The server/client doesn't even have to react to the client/server's action.


# Enter WebSockets
WebSocket is a technology that enables <u>bidirectional, full-duplex commnunication</u> between client and server over a <u>persistent, single-socket</u> connection.

A WebSocket connection starts as an HTTP request/response handshake; <u>***beyond this handshake***, WebSocket and HTTP are fundamentally different</u>.

The WebSocket technology includes <u>two core building blocks:</u>
- **The WebSocket protocol**. <u>Enables communication</u> between clients and servers over the web, and <u>supports transmission of **binary data and text** strings</u>.
- **The WebSocket API**. Allows you to perform necessary actions, like <u>managing the WebSocket connection</u>, <u>sending and receiving messages</u>, and <u>listening for events triggered by the server</u>.

## Comparing WebSockets and HTTP
|  | WebSocket | HTTP |
| --- | ---- | --- |
| **Architecture** | event-driven | request-driven
| **Communication** | Full-duplex | Half-duplex
| **Message exchange pattern** | Bidirectional | Request-response (Unidirectional)
| **Server push** | Core feature | Not natively supported
| **Overhead** | Moderate overhead to establish the connection, and minimal overhead per message | Moderate overhead per request/connection |
| **State** | Stateful | Stateless |
| **When to use** | When it comes to scalable, low-latency realtime applications. | If your app relies heavily on CRUD operations, and there's no need for the user to react to changes quickly. |

## Use cases and benefits
You can use if for different purposes such as <u>streaming data between backend services,</u> or <u>connecting a backend with a frontend via long-lasting, full-duplex connections.</u> 

**In a nutshell**, WebSockets are an excellect choice for <u>architecting event-driven systems</u> and <u>building reatime apps and services **where it's essesntial for data to be delivered immediately</u>**.

We can broadly grooup <u>WebSocket **use cases**</u> into **two distinct categories**:
- **Realtime updates,** <u>where the communication is unidirectional</u>, and <u>the server is streaming low-latency (and often frequent) updates to the client</u>.
  - Live sports updates, alerts, realtime dashboards, or location tracking, trading apps etc.
- **Bidirectional communication,** <u>where both client and the server can send and receive messages</u>.
  - Chat, virtual events, virtual classromss, collaborative apps.

Some <u>main benefits</u>:
- **Improved perfomance.** No need for a <del>new connection with every request</del>, reduction in the size of message (no HTTP headers). These helps <u>save bandwith</u>, <u>improves latency</u>, and <u>enhances scalability</u>.
- **Extensiblity.** Allows  for the implementation of <u>subprotocols and extensions for additional functionality</u>.
- **Fast reaction times.**

Nowadays, WebSockets are a key technology for building scalable realtime web apps.

# WebSocket Protocol
The base WebSocket protocol consists of **an opening handshake** (upgrading the connection from HTTP to WebSockets), <u>followed by</u> **data transfer**.
- After the client and the server successfully negotiate <u>the opening handshake</u>, **the WebSocket connection** acts as a persistent full-duplex communication channel **where each side can, independently, send data at will**.
- Clients and servers <u>transfer data</u> back and forth in conceptual units known as **messages**, which can **consist of one or more frames**.
- Once the WebSocket connection has served its purpose, it can be <u>terminated via a closing handshake</u>.

> Fragment identifiers are not allowed in WebSocket URIs. The hash character ( `#` ) must be escaped as `%23`.

## Opening handshake
The process of <u>establishing a WebSocket connection</u>.

It consists of <u>**an HTTP/1.1 request/response exchange** between the client and the server</u>.

- **The client** always initiates the handshake; it send <u>a `GET` request</u> to the server, indicating that it wants <u>**to updgrade the connection** from HTTP to WebSockets</u>.
  > The <u>headers below</u> are <u>**mandatory**</u> for the client request. There are optional headers as well.

  ```http
  GET wss://example.com:8181/ HTTP/1.1
  Host: localhost:8181
  Connection: Upgrade
  Sec-WebSocket-Version: 13
  Sec-WebSocket-Key: r2320uflwjfoiw3==
  ```
  > If any header is not understood or has an incorrect value, the server should stop processing the request and respond with `400 Bad Request` error response.

- **The server** must return <u>an `HTTP 101 Switching Protocols` response</u> code <u>for the **WebSocket connection** to be **established**</u>.
  > The <u>headers below</u> are <u>**mandatory**</u> for the server response. There are optional headers as well.

  ```http
  HTTP/1.1 101 Switching Protocols
  Connection: Upgrade
  Sec-WebSocket-Accept: Efp2j2p492rfjof23r=
  Upgrade: websocket
  ```
  > If a different status code is returned, the handshake will fail, and the connection will not be established.

- Once that happens, the WebSocket connection can be used for ongooing, bidirectional, full-duplex communications between them.

### Opening handshake headers (explained)

#### Mandatory Headers
- `Host` : The WebSocket connection URI
- `Connection` : Value must be `Upgrade`. Both client and server.
- `Upgrade` : Value must be `websocket`. Both client and server.
- `Sec-WebSocket-Version` : Value must be  `13`. The only allowed value.
- `Sec-WebSocket-Key` : A base64-encoded one-time random value (nonce) <u>sent by the client</u>.
- `Sec-WebSocket-Accept` : A base64-encoded SHA-1 hashed value <u>returned by the server</u> **as a direct response to `Sec-WebSocket-Key`**. <u>Indicates that the server is willing to initiate the WebSocket connection.</u>

#### Optional Headers
- `Sec-WebSocket-Protocol` : 
  - for **the client request**, it contains a <u>list of values indicating which subprotocols</u> it wants to speak, ordered by preference.
  - for **the server response**, it contains the first-supported one, of the selected subprotocol values.
- `Sec-WebSocket-Extensions` : <u>initially sent from the client</u> to the server, and <u>then subsequently sent from the server</u> to the client.
  - It helps the client and server agree on a set of protocol-level extensions to use for the duration of the connection.
- `Origin` : Header field sent by all browser clients.
  - Used to protect against unauthorized cross-origin use of a WebSocket server by scripts using the WebSocket API in a web browser.
  - The connection will be rejected if the `Origin` indicated is unacceptable to the server.

### `Sec-WebSocket-Key` and `Sec-WebSocket-Accept`
These headers are <u>essential in **guaranteeing**</u> that both the server and the client are capable of <u>**communicating over WebSockets**</u>.

> `Sec-WebSocket-Key`.

A base64-encoded one-time random value (nonce). Its **purpose** is <u>to help ensure that the server does not accept connections from non-WebSocket clients</u> (e.g., HTTP clients) that are being abused (or misconfigured) to send data to unsuspecting WebSocket servers.

> `Sec-WebSocket-Accept`.

A base64-encoded SHA-1 hashed value <u>generated by concatenating the `Sec-WebSocket-Key`</u> nonce sent by the client, <u>and the static value (UUID) `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`</u>.


## Message frames 
A WebSocket message consists of one or more frames.