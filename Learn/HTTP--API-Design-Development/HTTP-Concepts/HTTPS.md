# Intro
HTTPS combines the HTTP protocol with a powerful set of symmetric, asymmetric, and certificate-based cryptographic techniques.

# Overview
HTTPS is just <u>HTTP sent over a secure transport layer</u>.

Instead of sending HTTP messages unecrypted to TCP and accross the Internet. <u>HTTPS sends the HTTP messages first to **a security layer that encrypts them before sending them TCP**</u>.

# HTTPS Schemes
When a client is asked to perform a transaction on a web resource, it examines the scheme of the URL.
- If the URL is an *http* scheme, the <u>client opens a connection to the server on port 80</u> (by default) and **sends it plain-old HTTP commands**
- If the URL has an *https* scheme, the <u>client opens a connection to the server on port 443</u> (by default), **performs "SSL handshake" with the server, followed by the encrypted HTTP commands**.

# Secure Transport Setup
In HTTPS, 
- the <u>client first opens a connection to port 443</u> (the default port for secure HTTP) on the web server. Once the TCP connection is establised, 
- the <u>client and server initialize the SSL layer</u>, **negotiating cryptographic parameters and exchanging keys** (SSL handshake). When the <u>*handshake completes*</u>, 
- the <u>SSL initialization is done</u>, and the **client can send request messages to the security layer**, 
- The <u>security layer encrypts the messages before sending them to TCP</u>. 

# SSL Handshake
In an SSL Handshake, client and servers,
- Exchange protocol version numbers
- Select a cipher that each side knows
- Authenticate the identity of each side
- Generate temporary session keys to encrypt the channel.

See [SSL & TLS: Establishing Encrypted Communicatios](./SSL-TLS.md#establishing-encrypted-communications) for details.

# Server certificates
Server certificates, issued by a trusted CA, help you asses how much you trust the server before sending it personal information.

# Site Certificate Validation
