# Intro
Connection management involves, how HTTP manages TCP conections for its operation.

Opening and maintaining connections largely impacts the performance of Web sites and Web applications, bringing about the need to improve the management of TCP connections.

So far, HTTP has three models of connection management.
- Short-lived connnections
- Persistent connections
- HTTP pipelining

> Remember in networking that, TCP connection establishment and data transfer are programmable operations at the application layer. Therefore, it can be tailored to the needs of any protocol implmented over TCP.\
> The nuances in the different application layer protocols comes from how each programs TCP connection and data transfer differently at the application layer. Web browsers and HTTP servers implement the HTTP protocol.

It's important to note that <u>connecton manangement in HTTP applies to the connection between two consecutive nodes</u>, which is hop-by-hop and not end-to-end. The model used in connections between a client and its first proxy may differ from the model between a proxy and the destination server (or intermediate proxies).


## Short-lived connections
A new TCP connection is established each time a client needs to send a request, and closed once the response is received by the client.

Only one request/response pair can occur in a connection session.

 This is the first model used by HTTP in its infancy.

This model held an innate **limitation** on performance: 
- Opening each TCP connection is a resource-and-time-consuming operation in that, several messages must be exchanged between the client and the server before a connection is established.
- Network latency and bandwidth affect performance when a request needs sending.
- The efficiency of an opened TCP connection increases with time - warm connections, a feature of TCP_SLOW_START. This model does not make use of this efficiency feature, since it initiates a new cold connection with each request.

Modern Web pages require many requests to serve the amount of information needed. The limitations of this model makes it ineffienct for the modern web.

In HTTP/1.1, this model is only used when the `Connection` header is sent with a value of `close`.

## Persistent connections
A persistent connection is one which remains open for a period of time, and can be reused for several requests, saving the need for a new TCP handshake, and utilizing TCP's performance enhancing capabilities - warm connections.

This connection will not stay open forever: idle connections are closed after some time. Also, a server may use the `Keep-Alive` header to specify the life-time of the connection.

In HTTP/1.1, persistence is the default, and the header is no longer needed.

# TCP Performance Considerations
The actual TCP programming interface is the <u>sockets API</u>, provided by Operating Systems via its system calls to access the computer's networking resources.
- All application layer protocols, no matter how different, have their rules implemented with the sockets API.
- Browser engines and HTTP servers use the sockets API to implement their HTTP protocol. Email clients and Email servers use the same sockets API to implement their SMTP protocol.

Programming languages provide APIs to directly use TCP socket APIs, not restricted to any application layer protocol.

> HTTP Transaction Delays

Some networking delays occur in the course of an HTTP request. All these steps are involved before an HTTP message finally gets to the server.
- URL parsing, DNS resolution, Connection establishment for every HTTP request, Message travel.

## Performance Focus Areas
> TCP Connection Handshake Delays

When we set up a new TCP connection, even before you send any data, *the TCP software exchanges a series of IP packets (SYN, ACK) to negotiate the terms of the connection*. <u>These exchanges can significantly degrade HTTP performance if the connections are used for small data transfers</u>.

Persistent connections in HTTP allows reuse of existing connections to eliminate the impact of this TCP Connection setup delay.

> Delayed Acknowledgments

TCP implements an acknowledgement scheme to guarantee successfull data delivery.
- When TCP segments are sent, the receiver of each segment returns small acknowledgement packets back to the sender when segments have been received intact.
- If a sender does not receive an acknowledgement within a specified window of time, the sender concludes the packet was destroyed or corrupted and resends the data.
- <u>Because acknowledgements are small, TCP allows them to "pile up" so that they could be sent together with outgoing data packets heading in the same direction</u>, thereby making more efficient use of the network.
- To increase the chances that an acknowledgment will find a data packet headed in the same direction, many TCP stacks implement a **"delayed acknowledgement" algorithm**.
- <u>Delayed acknowledgements hold outgoing acknowledgements in a buffer for a certain window of time, looking for an outgoing data packet on which to attach themselves</u>. If no outgoing packet arrives in that time, the acknowledgment is sent in its own packet.
- But unfortunately, the bimodal request-reply behaviour of HTTP reduces the chances that this attachment can occur. There just aren't many packets heading in the reverse direction when you want them. The <u>disabled acknowledgement algorithms introduces significant delays</u>.

> TCP Slow Start

The **perfomance of TCP data transfer** also <u>depends on the **age of the TCP connection**</u>. TCP connections "tune" themselves over time, initially limiting the maximum speed of the connection and increasing the speed over time as data is transmitted successfully (i.e. as acknoledgements are received).
- This tuning is called <u>TCP slow start</u>, and its is *used to prevent sudden overloading and congestion of the Internet*. 
- The overtime increase in speed is called, *<u>opening the congestion window</u>*. The more the speed increases, the more packets are sent.
- Due to this congestion-control feature, new (cold) connections are slower than "tuned" (warm) connections that already have exchanged a modest amount of data.

Because tuned (warm) connections are faster, HTTP includes facilities that let you reuse existing connections. *<u>Persistent connections.</u>*
- A feature to control the timeout in a connection closes itself after it was opened, if no data is transfered through it (i.e. when the connection is idle).
- A major example, when a browser wants to fetch a Web page. The first request for the html page establishes the connection, and subsequent requests for additional hypermedia resources reuses this connection, after which it is closed.

> Nage's Algoritm and TCP_NODELAY

When streaming data through the TCP stack, network performance can be degraded severely if TCP sends large numbers of packets containing small amounts of data.

Nage's algorithm attempts to bundle up a large amount of TCP data before sending a packet, aiding network efficiency.

**Nagle's algorithm discourages the sending of segments that are not full-size**.
- The algorithm lets you send a non-full-size packet only if all other packets have been acknowledged. If other packets are still in flight, the partial data is buffered. 
- This buffered data is sent only when pending packets are acknowledged or when the buffer has accumulated enough data to send a full packet.

Nagle’s algorithm causes several HTTP **performance problems**:
- Small HTTP messages may not fill a packet, so they may be delayed waiting for additional data that will never arrive.
- Nagle’s algorithm interacts poorly with disabled
acknowledgmentsーNagle’s algorithm will hold up the sending of data until an acknowledgment arrives, but the acknowledgment itself will be delayed 100–200 milliseconds by the delayed acknowledgment algorithm.

# The `Connection ` header
The `Connection` general header controls whether the network connection stays open after the current transaction finishes. 
- If the value sent is `keep-alive`, the connection is persistent and not closed, allowing for subsequent requests to the same server to be done.
- Else if the value sent is `close`, the connection is short-lived as discussed above.

**Except for the standard hop-by-hop headers** (`Keep-Alive`, `Transfer-Encoding`, `TE`, `Connection`, `Trailer`, `Upgrade`, `Proxy-Authorization` and `Proxy-Authenticate`), <u>
- any hop-by-hop headers used by the message must be listed in the `Connection` header, **so that the first proxy knows it has to consume and not forward them further**.</u> Standard hop-by-hop headers are also required to be listed.
- These headers define the connection between the emitter and the first entity, not the destination node. (e.g. the `Proxy-Authorization` header, is only used by the proxy-server that receives the request for authentication purposes)