# Intro
Activities of HTTP around its connection.

# TCP Connections
**TCP/IP:** That layered set of protocols with which network devices communicate by packet switching.

I can also call the application layer, the data layer. Since this is where the data that would travel over TCP/IP is constructed and deconstructed.
- The HTTP protocol guides the construction of data at one host, and the deconstruction of the data at the other host.
- Even the establishment of connection is done by data transfer.

When you type in a URL in your browser, the browser engine does a couple of things.
- **URL Parsing:** It parses the URL to extract the server's hostname and port number.
- **DNS Resolution:** It resolves this hostname into its IP address.
- **TCP Connection:** It uses the `socket` system call to establish a TCP connection, passing it your client's IP address and ephemeral port, the server's IP address and port that was parsed and resolved.
- **Data transfer:** After connection is established `connfd`, through this connection, the browser constructs and sends its HTTP request message. The server received and processes this message, and then sends its HTTP response message. This response is then received and processed by the browser.
  ```http
  GET /request_target HTTP/1.1
  Cookie: value
  ...
  EOF
  ```
- **Close connection:** Finally, the browser closes the connection.

HTTP connections are just <u>TCP connections, *plus*, a few rules on how to use them</u>. TCP connections are reliable in that, data is transported and received in the same order they were sent.

A secure variant of HTTP, called HTTPS includes a security layer (TST or SSL) below the application layer in the TCP/IP stack, for establishing/opening a secure connection and encryption/decryption of messages before being sent through the open TCP Connection.

*Port numbers* are unique to each process (application in execution) in a computer. IP address gets you to the right computer, port number gets you to the right process.

The actual TCP programming interface is the <u>sockets API</u>, provided by Operating Systems via its system calls to access the computer's networking resources.
- All application layer protocols, no matter how different, have their rules implemented with the sockets API.
- Browser engines and HTTP servers use the sockets API to implement their HTTP protocol. Email clients and Email servers use the same sockets API to implement their SMTP protocol.

Programming languages provide APIs to directly use TCP socket APIs, not restricted to any application layer protocol.

---

# TCP Performance Considerations
> HTTP Transaction Delays

Some networking delays occur in the course of an HTTP request. All these steps are involved before an HTTP message finally gets to the server.
- URL parsing, DNS resolution, Connection establishment for every HTTP request, Message travel.

## Performance Focus Areas
> TCP Connection Handshake Delays

When we set up a new TCP connection, even before you send any data, *the TCP software exchanges a series of IP packets (SYN, ACK) to negotiate the terms of the connection*. <u>These exchanges can significantly degrade HTTP performance if the connections are used for small data transfers</u>.

*We'll discuss how HTTP allows reuse of existing connections to eliminate the impact of this TCP setup delay.

> Delayed Acknowledgments

TCP implements an acknowledgement scheme to guarantee successfull data delivery.
- When TCP segments are sent, the receiver of each segment returns small acknowledgement packets back to the sender when segments have been received intact.
- If a sender does not receive an acknowledgement within a specified window of time, the sender concludes the packet was destroyed or corrupted and resends the data.
- Because acknowledgements are small, TCP allows them to "pile up" so that they could be sent together with outgoing data packets heading in the same direction, thereby making more efficient use of the network.
- To increase the chances that an acknowledgment will find a data packet headed in the same direction, many TCP stacks implement a "delayed acknowledgement" algorithm.
- Delayed acknowledgements hold outgoing acknowledgements in a buffer for a certain window of time, looking for an outgoing data packet on which to attach themselves. If no outgoing packet arrives in that time, the acknowledgment is sent in its own packet.
- But unfortunately, there just aren't many packets heading in the reverse direction when you want them. <u>This introduces significant delays</u>.

> TCP Slow Start

The perfomance of TCP data transfer also depends on the age of the TCP connection. TCP connections "tune" themselves over time, initially limiting the maximum speed of the connection and increasing the speed over time as data is transmitted successfully (i.e. as acknoledgements are received).
- This tuning is called <u>TCP slow start</u>, and its is *used to prevent sudden overloading and congestion of the Internet*. 
- The overtime increase in speed is called, *<u>opening the congestion window</u>*. The more the speed increases, the more packets are sent.
- Due to this congestion-control feature, new (cold) connections are slower than "tuned" (hot) connections that already have exchaned a modest amount of data.

Because tuned (hot) connections are faster, HTTP includes facilities that let you reuse existing connections. *<u>Persistent connections.</u>*
- A feature to control the timeout in a connection closes itself after it was opened, if no data is transfered through it.
- Imagine an online text editor, that has to send update to the server for each charater it enters. Following charactes than makes use of the initial connection established by the first character as the user types. If the user holds for sometime, the connection then closes.

