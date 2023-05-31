# Overview
> This page only includes points I'm not previously familiar with.

## Components of HTTP-based systems
- **Client or User-agent:** Any tool that acts on behalf of the user. Web browser, Robots, Command line interfaces, Script etc.
- **Web Server:** It serves the document as requested by the client. A server appears as only a single machine virtually; *but it may actually be a collection of servers sharing the load (load balancing),* or *a complex piece of software interrogating other computers (like cache, a DB server, or e-commerce servers), totally or partially generating content on demand.*
  - A server is not necessarily a single machine, but several server software instances can be hosted on the same machine.
- **Proxies:** **Between the Web browser and the server, numerous computers and machines relay the HTTP messages.** There are ones that operate at the network, link and physical layers, but as we get to the application layer they become transparent. **Those operating at the application layers are generally called *proxies*.** They may(transparent) or may not(non-transparent) alter the HTTP message before passing it along to the client of server.\
  - **Proxies may perform numerous functions:**
    - Caching: The cache can be public or private
    - Filtering: Like an antivirus scan or parental controls
    - Load balancing: Allowing mltiple servers to serve different requests
    - Authentication: To control access to different resources
    - Logging: Allowing the storage of historical information.

---
## Basic aspects of HTTP
- HTTP is extensible: HTTP headers makes it easy to extend and experiment with. **New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics.**

- HTTP is stateless, but not sessionless: There is no link between two reuquests being succcessively carried out on the same connection. **But _HTTP cookies_ allow the use of stateful sessions.** Using header extensiblity, HTTP Cookies are added to the workflow , allowing session creation on each HTtP request to share the same context, or the same state.

---
## What can be controlled by HTTP
- Caching: How documents are cached.
- Relaxing the *same-origin* constraint: The server can control the origin that can access it via HTTP headers.
- Authentication: Authorization, HTTP Cookies.
- Proxy and tunneling.
- Sessions

---
## Architectural components of the Web
There are many other web applications you can interact with on the Internet asides web clients and servers.

- Proxies
- Caches
- Gateways
- Tunnels
- Agents