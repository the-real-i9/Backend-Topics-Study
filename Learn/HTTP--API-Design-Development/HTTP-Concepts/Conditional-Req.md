# HTTP conditional requests
[See here](https://devdocs.io/http/conditional_requests).

HTTP has a concept of conditional requests, where <u>the result, and even the success of a request, can be changed</u> by **comparing the affected resources with the value of a _validator_**. Such requests can be useful 
- to validate the content of a cache, and sparing a useless control,
- to verify the integrity of a document, like when resuming a download, or when preventing lost updates when uploading or modifying a document on the server.

A _validator_ being `Last-Modified-Since` or `E-tag` header.

It is mostly used to program caches (caching servers), using the cache controlablity headers of server's response and and those of client's request.