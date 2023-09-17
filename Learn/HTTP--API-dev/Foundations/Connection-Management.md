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
