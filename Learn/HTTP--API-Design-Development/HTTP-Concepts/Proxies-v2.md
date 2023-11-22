> Mozilla documentation
# Proxy servers and tunneling

# Two types of proxies
## Forward proxies
Proxies that stays in between the client and the network, operating on behalf of the client.

They can also be anonymous proxies and allow users to hide their IP address while browsing the Web or using other Internet services.

## Reverse proxies
Proxies that stays in between the network and the server, operating on behalf of the server.

They can also hide the identities of origin servers.

**Common uses:** Load balancing, Caching, Compression

> Refer to [Proxies v1](./Proxies-v1.md) for more.

# Forwarding client information through proxies

**The standardized header:** \
<u>`Forwaded` header:</u>\
Contains information from the client-facing side of proxy servers that is altered or lost when a proxy is involved in the path of the request.

**To provide information about the proxy it self:**\
<u>The `Via` header:</u>\
Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.

As request or response messages are passed downstream, proxy servers add (concatenates) their identities to the `Via` header, which then arrives finally at the origin server (as request), and at the client (as response).

## HTTP tunnelling
