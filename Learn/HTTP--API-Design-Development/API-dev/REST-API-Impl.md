# What you need to know
## REST API Principles
1. Everything is a resource.
2. Each resource is identifiable by a URI
3. Resources are manipulated via standard HTTP methods
4. **Resources can have multiple representations**
    - A resource may have multiple formats with the same data, for example, an image.
    - If an image, for example, is stored in PNG format (`image/png`) on the server, but the client requests for a JPEG format of the image, via the `Accept` request header, value `image/jpeg`. It is the responsibility of the server to, either provide that data in the requested format (if available), or return a `406 Not acceptable` error. <u>This process is known as **content negotiation** in HTTP</u>.

5. **Communicate with resources in a stateless manner**
    - All modifications to a resource should be carried out within an HTTP request as if the server has no past knowledge of the resource. This means partial resource updates are not supported, rather, you should always send the complete state of the resource.

    - Imagine our API architecture uses horizontal scaling with a load-balancer and a server farm. 
      - You cannot keep state on the server, unless you want to always route the same request to the same server all the time - you don't want to do that. 

      - A solution is to keep state within client's request information carriers, which includes the URI or headers. Now each client request carries its own state information. Even if the request is routed to another server by the load-balancer, the server would just get the state information from the client's request. *This is what happens with stateless authentication/authorization mechanisms.*
      - For large state information, the best solution is to make our server farm use one shared database. Each server can access the same database to get the desired state information.

## REST goals
- **Separation of the representation and the resource**
  - This has been discussed in **REST API principle - 4**.
- **Visibility**
  - Every aspect of a service should be self-descriptive and follow the natural HTTP language specification
  - Monitoring applications would be interested only in the HTTP communication between the REST service and the caller.
  - Remember that <u>caching reduces the visibility of your RESTful applications and in general should be avoided</u>, **unless for serving resources subject to large amount callers (or expensive transactions)**. In such cases, it may be an option, <u>after carefully evaluating the possible consequences of serving obsolete data</u>.
- **Reliablity**
  - Consumers should consider operation's safety and the idempotence features in order to be served reliably.
- **Scalability and Performance**
  - RESTful applications must ensure scalability and must strive to achieve the lowest possible latency.


# Building a Typical Web API

## Specifying the API

The very **first thing** a project usually  starts with is <u>a **definition of the operations** the API will expose</u>.
- An **operation** is exposed by <u>an HTTP method and a URI</u>.
- The action performed by each operation shuld not contradict the natural meaning of its HTTP method.

The **second step** is to choose an appropriate format for our application's data. It's mostly JSON.

**Third**, implement a module that will export functons serving each of the operations in the routes, **controller**.

## Implementing Routes

A route is <u>a binding between a URI and function</u>.

An `express` object instance contains functions named after each HTTP verb: `get`, `post`, `put`, and `delete`.
- They have the following syntax: `function(uri, handler)`.
- They are used to bind a handler function to a specific HTTP action executed over a URI.
- The handler has two arguments `request` and `response`.
- > Check the Express documentation fort the details.

**Now**, we create our routes by <u>binding endpoints with corresponding functions exported from controller module</u>.

## Querying the API using test data (optional)

You can make use of postman.

## Content negotiation

Let's assume our service has to offer data in different formats, in addition to JSON, for example. Then, the consumer needs to explicitly define the data format they need.

Negotiation makes use of the `Accept` header.
- The `Accept` HTTP header specifies the media type of the resource that the consumer is willing to process. 
- In addition to the `Accept` header, the consumer may also make use of the `Accept-Language` and `Accept-Encoding` headers to specify what language and encoding the results should be provided in.
- If the server fails to provide the results in the expected format, it can either return a default value or make use of `HTTP 406 Not acceptable` in order not to cause data confusion errors on the client side.

The Node.js HTTP `response` object contains a method, `format()`, that performs content negotiation based on the `Accept` HTTP header if set in the request object.

```js
app.get("/resource", (req, res) => {
  res.format({
    "text/xml": () => {
      res.send(/* xml format of the resource */)
    },
    "application/json": () => {
      res.send(/* json format of the resource */)
    },
    "default": () => {
      // send error
      res.status(406).send("Not acceptable")
      // or, send default format
      res.send(/* default format */)
    },
  })
})
```

## API versioning

**When our public API evolves**, consumers may not be able to handle the modified data appropriately and there is no way of notifying all of them. Therefore, 
- we need to keep our public APIs as backward-compatible as possible (i.e. older versions should still be working well for consumers that haven't swtiched), 
- we need to create a new version of our public API that has the new features, while still making the old version work for consumers that are yet to migrate, since we don't want their application to break due to a direct modification of the current version.

by <u>using different URIs for different versions of our API</u>.

When the time is right for a new version, for example, V2, we may need to keep the previous version availble at another URI for backward-compatibility.
- Best practice is to <u>encode the version number in the URI,</u> such as `/v1/resource`, <u>and keep,</u> `/resource`, <u>mapped to the latest version</u>.
- Thus, requesting `/resource` will cause a redirect to `/v2/resource` and will make use of the HTTP `3xx` status codes to indicate the redirection to the latest version.

# Implementing the database
**Step 1:**
Database design:
- Entity-Relationship(ER) modeling
- Conceptual, Logical and Physical design

**Step 2:** Create database schema in DBMS

**Step 3:** Wire up the database to Express using the database driver.

**Step 4:** Execute database transactions and queries in controller functions

# Resful API Design guidelines
## Endpoint URLs and HTTP status codes best practices
A resource is exposed by a single URL, and it supports resource manipulation actions that are determined by the HTTP method of the request.

General rules that a well-defined API should follow.
- `POST` request 
  - creates a new resource, and responds with `201 Created` status
  - may reject the creation of a resource if it has to be unique and it already exists, and responds with a `409 Conflict`, or a more general `400 Bad Request` status. This should be followed an explanation of the error.
  - may choose to update the resource, if it already exists, rather than reject the request, and responds with a `200 Ok` status. Notify the user of its existence and update. This should be rarely done.

- `PUT` request
  - always expects a resource ID as a parameter, if a resource with this ID exists, it gets updated with a new state provided in the body of this request, and responds with a `200 Ok` status.
  - may decide to reject handling of non-existent resources with the `404 Not Found` status
  - may also decide to create a new resource with the provided ID, rather that reject handling the non-existent resource, and respond with a `201 Created` status

- `DELETE` request
  - expects a resource ID as a parameter. On successful deletion, we respond with `200 OK` status, followed by a body as a deletion message.
  - will indicate that a resource with the provided identifier does not exist with a `404 Not Found` status.

- As a general rule, `5XX` should not indicate application state errors but more severe errors, such as applications erver of database failures.

- It is best practice that `update` and `create` operations should return a body containing the entire state of the resource. This may save the client an addtional `GET` request if they needed to check the new state.

## Extensibility and Versioning
First, we <u>enable the current consumers of the API to continue using the same version on a different URL</u>. This will keep them backward-compatible until they adopt and successfully test the new version.

- Duplicate your current `route.js` file. Rename it to `route_v2.js`. Now path-prefix each endpoints with `/v2`. From there you can include new features.
```js
// route.js
app.get("/resource", () => {
  doSomething()
})

// route_v2.js
app.get("/v2/resource", () => {
  doSomething()
  doSomethingNew()
})
```

- <u>To enable backward compatibility, and notify our customers of a new version,</u> duplicate the endpoints of `route.js` into `route_v1.j`, where the endpoints are now path-prefixed with `v1`
```js
// route.js
app.get("/resource", () => {
  doSomething()
})

// route_v1.js
app.get("/v1/resource", () => {})
```
- Move the functionality of the each routes in `route.js` into their corresponding new route in `route_v1.js`. In addition to moving the functionality, make them redirect to their corresponding new route, with a `301 Moved permanently` status.
```js
// route.js
app.get("/resource", (req, res) => {
  res.redirect("/v1/resource").status(301)
})

// route_v1.js
app.get("/v1/resource", () => {
  doSomething()
})
```
- The redirection to version `v1` creates for our customers the awareness of a new or upcoming version `v2`.

## Linked data & Working with Arbitrary data
Make use of a Content Delivery Network (CDN)

Rather than storing static files in a database or the origin server's file system, use the backend service to upload static files to a remote file system (CDN).

You should receive a unique url that you can attach to user data, for example, `profilePic: {url}`, `posts: [{post1_url}, {post2_url}]`.

The URL might look like these, `https://cloudinary.com/i9app/profile_pictures/{userId}/pic1.jpg`. The URL models a file system, where paths are directories/folders.

## Implementing pagination and filtering
Check out implementation videos and framework libraries that gude you in implementing this.

## Caching
You know how to go about this.

If you want to support high-level caching, use a public proxy cache server dedicated to your API. If you need only low-level caching, you can just integrate a key-value database like Redis in your server.

# Preparing a RESTful API for Production
## Discovering and exploring RESTful services --- API documentation
Creating and publishing a <u>well-specified documentation for your API</u>.

Currently, the [swagger documentation](https://swagger.io/specification/) format is heavily adopted and has become an informal standard for describing RESTful services, so we can use it to ease the adoption and discovery of our service.

## Testing RESTful APIs
Check out tutorial videos

# Securing the Application
- Cross Origin Resource Sharing
- Content Security policy
- Authentication and Authorization
- Deploying backend code to an HTTPS (TLS) enabled remote server. e.g. Heroku
