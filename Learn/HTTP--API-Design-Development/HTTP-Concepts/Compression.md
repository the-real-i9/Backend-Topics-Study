# Compression in HTTP
[Check here](https://devdocs.io/http/compression).

Compression is an important way to increase the performance of a Web site. For some documents, size reduction of up to 70% lowers the bandwidth capacity needs. Over the years, algorithms also got more efficient, and new ones are supported by clients and servers.

In practice, web developers don't need to implement compression mechanisms, both browsers and servers have it implemented already, but they have to be sure that the server is configured adequately.

## End-to-end compression
Compression and decompression happens on clients and origin servers. Proxy servers in-between just forwards the compressed data to the next hop and are not involved in compression.

## Hop-by-hop compression
Compression and decompression neither happens on clients nor on servers. Rather, they happen among the proxies in-betwen