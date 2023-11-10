# Thoughts
- **We can only make sense of caching, if our caching proxy servers are near to clients**. <u>If our caching proxy server and origin server are located in the same place, there's no caching</u>.

- Tools like **Redis or Memcached are just storage technologies for our caching proxy server**, just as tools like Postgres or MongoDB are storage technologies for our origin server. This makes sense, **since our caching proxy server's goal is only to serve a processed meal**, there's no processing to be done like the origin server, **hence, the key-value store**.

- Your caching proxy server is just like a CDN for your API. And remember that the core concept of CDNs are that they are "caching proxy servers that are <u>near to clients</u>".