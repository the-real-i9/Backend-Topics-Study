# Principles of Designing RESTful APIs
### Keep it simple
Make sure tthat the base URL of the API is simple
```
/products
/products/12345
```
### Use nouns and not the verbs (for endpoints)
We already have HTTP methods to describe the APIs better
```
/getAllProducts ❌
/products ✅
```
### Use of the right HTTP methods
RESTful APIs have various methods to indicate the type of operation we are going to perform with this API. We need to make sure we use the right HTTP method for a given operation.

### Use plurals
Using plural avoids confusion about whether we are talking about getting a single resource or a collection.
```
/products ✅
/products ❌
```

### Use parameters
```
/products?name='ABC' ✅
/getProductsByName ❌

/products?type='xyz' ✅
/getProductsByType ❌
```

### Use proper HTTP codes
I believe this ain't an issue for you!

### Versioning
Keep versions prefixed to the resource. It is always good practice to keep backward compatibility so that if you change the API version, consumers get enough time to move to the next version.
```
/v1/products ✅
/v2/products ✅
```

### Use pagination
Use of pagination is a must when you expose an API that might return huge data, and if proper load balancing is not done, the consuemr might end up bringing down the service.

Use of `limit` and `offset` is recommenced here.
```
/products?limit=25&offset=50
```
It is also advised to keep a default limit and default offset.

### Supported formats
Most modern-day applications should <u>return JSON responses</u> unless you have a lacy app that still needs to get an XML response.

### Use proper error messages
It is alyways good practice to keep a set of error messages the application sends and respond to that with the proper id. For example
```json
{
  "eror": {
    "message": "(#803) Some of the aliases you requested do not exist: products",
    "type": "OAuthException",
    "code": 803,
    "fbtrace_id": "FOXX2AhLh80"
  }
}
```
Some implementations return a URL with an error message, which tells you more about the error message and how to handle it as well.

### Use of OpenAPI specifications
In order to keep all teams in your company abiding by certain priciples, the use of OpenAPI specifications can be useful. 

<u>OpenAPI allows you to design your APIs first and share that with the consumers in an easier manner</u>.