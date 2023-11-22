# Intro
Web proxy servers are application layer intermediaries that <u>send requests and receive responses on a client's behalf</u> (Client-side proxy or Forward proxy) OR <u>receive requests and send responses on a server's behalf</u> (Server-side proxy or Reverse proxy)

Origin clients and servers communicate with their respective proxies.

HTTP proxy servers act as both web clients and web servers. If you're creating one, you'll need to carefully follow the rules for both HTTP clients and HTTP servers.

A proxy can be shared among many clients
- **Public/Shared proxies:** Some proxy applications such as, <u>**caching proxy servers** for example</u>, become more useful as more users sends request to the same proxy server, because they can take advantage of common requests between users.
  - These are the common type of proxies, and they should be your focus. You'll use it a lot.

Or dedicated to a single client
- **Private/Dedicated proxies:** Some browser assistant products, as well as some ISP services, run small proxies direcly on the user's PC in order to extend browser features among other things.
  - Example of a browser assistant product is *Postman's intercepting proxy*.
  - You configure it on your PC.
  - Browsers forward your request to that proxy, and Servers send responses to it.
  - The proxy logs your HTTP transaction in the Postman app, and forward requests and responses to server and client, respectively.

The main difference between proxies and gateways is that, proxies forward request using the same protocols all through. While gateways forward request using a different protocol from the one it receives, to a server.
- For example, When your NodeJS server sends an email with nodemailer (using SMTP) or when it communicates with a database (using the proprietary database protocol), on behalf of the client.

# Ways Proxies can be used
Proxies can monitor, modify or route the traffic, to implement many useful value-added services.

- **Child Filter:** School computers with internet connection, Cafes or Universities providing free internet access, can use <u>filtering client proxies to block access to adult content, and may only allow access to educational content</u>.
  - Proxy servers can include a list of unwanted website URLs to check against 
    ```js
    if(unwanted_sites[].includes(site_url)) block();
    ```

- **Document access controller:** Controll access to several resources from several users.
- **Security firewall:** Use proxy servers to restrict traffic, eliminate/block threats, sanitize traffic for viruses.
- **Web cache:** This is a common use case. Locally store copies of frequently accessed documents and serve them on demand, <u>reducing slow and costly Internet bandwith</u>.
- **Reverse proxies**: Proxies that act as web servers, receiving real web server requests. They often communicate with other servers, each based on the requested resource. **They are awesome!**, <u>there's no limit to how much you can get creative with them</u>.
- **Content router:** Vectoring requests to particular web servers based on Internet traffic conditions and type of content. <u>They can be used to implement various service-level offerings</u>. e.g. download speeds
- **Transcoder:** Proxies can modify the body format of content before delivering it to clients. This is called *transcoding*.
  - Format conversion, Language translation, Compression, Image color correction.
- **Anonymizer:** Anonymizer proxies provide heightened privacy and anonymity, by <u>actively removing identifying characteristics from HTTP messages</u>.

# Where do Proxies go?
You don't need to delve into this too much. Since you know you'll be working with server-side proxies most of the time.

A Proxy server can have a decicated process on the one machine, forwarding requests to other processes or machines, or can have a dedicated machine for itself, if it does much work.

## Proxy Server Deployment
**Egress proxy:**\
<u>Proxies that sit at the exit point of a LAN</u>. They might be used to offer firewall protection, reduce bandwidth charges, or improve perfomance of Internet traffic.

**Ingress (Access) proxy:**\
<u>Proxies often placed at ISP access points, processing aggregate requests from customers.</u>

**Reverse proxy:**\
Proxies at the edge of network, in front of web servers, serving different needs.
  - Firewall, Content routing, Load balancing, Caching etc.
  - They typically assume the address of the web server. This allows us to hide the identities of origin servers.

**Network exchange proxy:**\
Proxies placed at the meeting point of different/separate networks (LANs or WANs), to alleviate congestion at Internet junctions through caching and to monitor traffic flows.

---

> Disclaimer:

Proxies are not physical entities designed to be recongnized according to their function. They're merely proxy servers each containing the program that performs the specific function for which it is named, at the location where it will be used.

A "content router" is just a proxy server that contains a program that does content routing.

<u>The two things that matter and to actually consider are:</u>
- **Who and Where wants to use the proxy?**: Client, ISP, LAN, Server.
- **What would the proxy do?**: Proxies can perform several functions at several locations. A function is not tied to a location. They can do whatever for whoever, anywhere between the client and origin server(s).

It's crazy! Proxies can even forward request to proxies, that perform a different fuction.

---

Learn other things when needed.