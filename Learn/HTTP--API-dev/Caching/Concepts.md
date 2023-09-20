# What is Caching?
The process of keeping local copies of frequently accessed resource by *web caches*, to **reduce** 
- *redundant transfers*, 
- *network/bandwidth bottlenecks*, 
- *demand on origin servers*, and 
- *distance delays*.

If the requested resource is in the cache storage, the caching proxy server serves the client from the cache without contacting the origin server, else, the cache requests the resource from the origin server, serves it to the client, and keeps a local copy for future requests to the same resource for any user.

> For the rest of this read, just assume, when we refer to "cache", we're talking about your caching proxy server that uses a cache storage like Redis or Memcached.

> You need to know all these well, since chances are you'll be creating a caching proxy server for your API.

# Hits and Misses
When a resource is requested from a cache and it is found in the cache, this is called a <u>cache hit</u>, otherwise, it is called a <u>cache miss</u>, in which case it will be fetched from the origin server.

Because the origin server content can change, <u>caches have to check every now and then that their copies are still up-to-data with the server</u>. This is known as **HTTP revalidations**.

To make more revalidations efficient, HTTP defines <u>special requests that can quickly check if content is still fresh, without fetching the entire object from the server</u>. `If-Modified-Since`, `If-None-Match`

A cache can revalidate a copy any time it wants, but to avoid degrading performance, **most caches revalidate a copy only** <u>when it is requested by a client</u> and <u>when the copy is old enough to warrant a check</u>.

**When a cache needs to revalidate a cached copy**, 
- it sends a small revalidation request to the origin server.
- The origin server responds with a tiny `304 Not Modified` response.
- On receiving this response, it marks the cached copy as temporarily fresh again, and serves the copy to the client.
- This is called a <u>revalidate hit</u> or <u>slow hit</u>. Although it's *slower than a pure cache hit* (we checked the server), it's *faster than a cache miss* (no object is retrieved)

When the `If-Modified-Since` header is added to a `GET` request, **this header tells the server to** <u>send the object only if it has been modified since the time the copy was cached</u>. There are three possiblities:
- If this server object is **not modified**: we have a <u>*revalidate hit*</u>, with a `HTTP 304 Not Modified` response, with no body content.
- If this server object has been **modified**: we have a <u>*revalidate miss*</u>, followed by an `HTTP 200 OK` response, with the full body content.
- If this server object has been **deleted**: we get back a `404 Not Found` response, and <u>the cache deletes its copy of the object</u>.

There are other ones apart from the `If-Modified-Since` header, but **it is the most popular one**.

## Hit Rates
- **Document Hit Rate:** This represents the fraction of <u>*requests* that are served from cache</u>.
- **Byte Hit Rate _(preferred)_:** This represents the fraction of <u>*all bytes transferred* that were served from the cache</u>.

# Cache Topologies
- **Private caches:** e.g. Dedicated proxy caches, Browser built-in disk cache.
- **Public proxy caches (proxy caches):** *Caching Proxy Servers* that use Redis or Memcached for storage. 
  - They fetch a resource on cache miss (as a result of a client requesting a new resource), they cache the resource, and serve it on every request to it again from any client.

## Proxy Cache Hierarchies

Hierarchies of caches, where cache misses in smaller caches are funneled to larger *parent caches* that service the leftover traffic.

The idea is to use small, inexpensive caches near the clients and progressively larger, more powerful caches up the hierarchy to hold documents shared by many users.

# Keeping Copies Fresh
HTTP includes <u>*simple mechanisms* **to keep cached data sufficiently consistent with servers**</u>. These are, **_document expiration_** and **_server revalidation_**.

## Document Expiration
HTTP lets an origin server attach an "expiration date" to each document, using special `HTTP Cache-Control` and `Expires` headers. <u>These headers dictate how long content should be viewed as fresh</u>.

<u>Until a cache document expires, the cache can serve the copy as often as it wants, without ever contacting the server</u> - *unless, of course, a client request includes headers that prevent serving a cached or unvalidated resource*.
- But, once the cached document expires, the cache must check with the server to ask if the doucment has changed and, if so, get a fresh copy (with a new expiration date)

Servers specify expiration using the `Expires` or the <u>`Cache-Control: [max-age]`</u> headers which accompany a response body. They both do the same thing, but the latter it preferred, because it uses relative time to calculate the expiration, rather than absolute time that depends on the correctness of computer's clock.

## Server Revalidation
After the cached document has expired, <u>the cache needs to ask the origin server *"whether" the document has changed*</u>. *It just means, "it's time to check whether...", it doesn't actually mean the document has changed*.

The outcome of revalidation determines what actions comes next:
- **If the document has changed**, <u>the cache gets a new copy of the document</u>, replaces the old cache, and sends the document to the client.
- **If the document has not changed**, <u>*the cache only gets new headers, including a new expiration date*</u>, and updates the headers in the cache.

This is nice, since the cache doesn't have to verify a document's freshness for every request - it has to revalidate with the server only once the document has expired.

# Revalidation with Conditional Methods
HTTP allows a cache to send a "conditinal `GET`" to the origin server, asking the server to send back an object body only if the document is different from the copy currently in the cache.

Conditional `GET`s are initiated by adding special conditional headers to `GET` request messages. Among the five HTTP defines, the two that are most useful for cache revalidation are `If-Modified-Since` and `If-None-Match`.

> This technique is in no way specific to caches, itis just a way of conditionally `GET`ing a resource. It serves a useful purpose for caches to revalidate content. You can use it on the client side too directly with the origin server if you like.

## `If-Modified-Since`: Date Revalidation
- If the document was modified since the specified date, the `If-Modified-Since` condition is true, and the GET succeeds normally. The new document is retured to the cache, along with new headers, including a new expiration date.
- If the document was not modified since the specified date, the condition is false, and a small `304 Not Modified` response message is returned to the client, without a document body, for efficiency. <u>Only headers that need updating the original are retured, which of course will include *a new expiration date*</u>.

The `If-Modified-Since` header works in conjunction with the `Last-Modified` server response header. 
- When a cache wants to revalidate a cached document, it includes an `If-Modified-Since` header with the date the cached copy was last modified. 
- If the content has changed, then the `Last-Modified` date of the origin server's copy will be different, the origin server will send back the new document. 
- Otherwise, the server's and cache's `Last-Modified` matches, and it will return a `304 Not Modified` response.

## `If-None-Match`: Entity Tag Revalidation
There are some situations when the last-modified date revalidation isn't adequate.

To get around these problems, HTTP allows you to <u>compare document "version identifiers"</u> called *entity tags* (ETags).
- When the publisher makes a document change, he can change the document's entity tag to represent this new version.
- Caches can then use the `If-None-Match` conditional header to `GET` a new copy of the document if the entity tags have changed.

# When to use Entity Tags and Last-Modified Dates
- Clients **must** use an entity tag if a sever sends back an entity tag.
- If a sever sends back only a `Last-Modified` value, clients **can** use `If-Modified-Since` validation.
- If both an entity tag and a last-modified date are available, a client should use both revalidation schemes.
- Origin servers should send an entity tag validator unless it is not feasible to generate one. Also, it's preferred to also send a last-modified value.
- If a cache or server receives a request with both revalidation conditions, it must not return a `304 Not Modified` response.

# Controlling Cachability
HTTP defines **several ways for <u>an origin server to specify</u> how long a document can be cached** before it expires.

In **decreasing order of priority**, the origin server can:
- Attach a `Cache-Control:`
  - `no-store`
    - **forbids a cache from making a copy of the response**. A cache would typically forward this response to the client, and then delete the object, <u>just like a non-caching proxy server</u>.
  - `no-cache`
    - *<u>response can actually be stored in the local cache storage</u>.* It just **cannot be served from the cache to the client without first revalidating the freshness with the origin server**. "Does not serve from cache without revalidation".
  - `must-revalidate ...` 
    - Other `Cache-Control` values do not **enforce revalidation strictness** on their own, in the sense that, if the origin server is down when they're trying to perform revalidation, they can serve a stale (expired) cache object. But, with this value included, <u>if the origin server is down, they'll rather throw a `504 Gateway Timeout` error back to the client</u>.
  - `max-age=<T>` (for private/dedicated caches), `s-maxage=<T> ...` (for public/shared caches)
    - It indicates the <u>number of seconds since it came from the server (relative date)</u> for which a document can be considered fresh. Setting `max-age=0` or `s-maxage=0` would cause the cache to always perform server revalidation on every access, as *it would always conclude it has expired*.
  - ...header to the response.
- Attach an `Expires <Date>` header to the response.
  - Just like `max-age` but with an absolute date.
- Attach **no expiration information**, letting the cache determine its own heuristic expiration date.
  - This means, the origin server does not control cachability. It is left to the caching proxy server in use to do handle this. <u>*You don't have to bother too much about this, since you would be using a managed cache server like Redis or Mecached*</u>.

*__Your__ caching proxy server must conform to these <u>origin server cache control rules</u>, for caching in Redis*.

---

**Clients can also use the `Cache-Control` header from their own end**, to <u>control strictness on the `GET`ing of cached resources</u>. This can be used to *tighten strictness (more strict)* or *relax strictness (less strict)*.

> The former makes a cache server conform to the rules of the origin server for caching, <u>this one makes a cache server conform to the rules of the client for `GET`ing documents</u>.

`Cache-Control:`
- `max-stale` : The cache is free to serve stale content. (Relaxed)
- `max-stale=<S>` : The cache is free to serve stale content, unti maximum time `<S>`. (Relaxed)
- `min-fresh=<S>` : The document must still be fresh for at least `<S>` seconds in the future. *"Keep giving me fresh content until time exceeds `<S>` seconds"*. (More strict).
- `max-age=<S>` : The cache only returns a document with `age <= max-age`. This can be overidden by `max-stale`.
- `no-cache` : Client won't accept an un-revalidated cache resource.
- `no-store`: The cache must fetch from the origin server and <u>delete every trace of the resource from the cache</u>.
- `only-if-cached` : The client wants a copy only if it is in the cache.

# Real-World Caching Tools
Technologies for caching.

## Client Side
These are private caches.
- Browser disk cache (Automatic management)
- You can also create a private cache using a private proxy server (Manual management).

## Server Side
These are public caches.
- A caching proxy server that uses Redis or Memcached (You'll host it yourself). This is more like creating your own CDN.
- Cloud provider's managed cache.
- Content Delivery Networks (CDN) - A caching proxy server for serving mostly static files. They are mostly offered by cloud providers.

These caches all obey cache control rules.
