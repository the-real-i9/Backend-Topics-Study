# What is JSON Web Token?
JWT is an open standard that defines a compact and self-contained way <u>for **securely transmitting information** between parties as JSON object</u>. 
- The information can be verified and trusted because it is digitally signed. 
- JWTs can be signed using a secret (HMAC algorithm) or a public/private key pair (using RSA or ECDSA).

> Note: When something is a standard or protocol, it means you can implement it as a service, just by following the specification/rules defined in the standard or protocol.

# When should you use JSON Web Tokens?
- **Authorization:** Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

- **Information Exchange:** JSON Web Tokens are a good way of securely transmitting information between parties.
  - Because JWTs can be <u>signed—for example, using public/private key pairs</u>—you can be sure the senders are who they say they are. **Proving identity**.
  - Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with. **Verifying information**.

# What is the JSON Web Token structure?
In its compact form, JSON Web Tokens consist of three parts separated by dots ( `.` ), which are:

- Header
- Payload
- Signature

## Header
Consists of two parts: the **type of token** (JWT) and the **signing algorithm** being used (HMAC SHA256 or RSA).
```json
{
  "alg": "HS256",
  "type": "JWT"
}
```
The header is Base64Url encoded to form the first part of the JWT.

## Payload
Contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: *registered*, *public*, and *private* claims. *Check the graphical illustration to know more*.

- **Registered claims:** specify <u>information about the token</u> e.g. `iat` (issued at), `exp` (expiration date), `iss` (issuer) etc.
- **Public claims:** specify <u>any information you want to exchange/carry in the token</u>. From user profile information (e.g. `{ "email": "ex@gmail.com" }`) to user permissions (e.g. `{ "admin": true }`) to any information you want you want to make decisions based on.
- **Private claims:** specify information used by the token provider (signer) and consumer (verifier) engine. *"Nan'yabizness"*

```json
{
  "id": "434h2kj32",
  "email": "i9@gmail.com", // public claim: user info
  "admin": true, // public claim: permission
  "exp": 3600 // private claim
  ...
}
```
The payload is then Base64Url encoded to form the second part of the JWT.

## Signature
To create the signature part you have to take the <u>encoded header and payload</u>, sign it with <u>a secret</u>, using <u>the algorithm (hash function) specified in the header</u>.

The signature is used to verify the message wasn't changed along the way,
  - Assuming an hacker base64-decodes the payload portion of the JWT and modifies the information, when the summary of the information (signature portion) is decoded using the hash function and the secret key (unknown to the hacker), resulting information wouldn't match the one modified.
  - Even though the hacker tries to decrypt the signature portion of the JWT, it doesn't know the secret key in order to get the dirty job done.

and in case of tokens signed with a sender's private key, it can also verify the identity of the sender, as only the sender's public key can successfully decrypt the message.

```js
HMACSHA256(b64_header, b64_payload, "secret_123")
```

## Putting it altogether
The output is three base64-URL strings separated by dots that can be easily passed in HTTP environments.

# How do JSON Web Tokens work?
In authentication, when the user successfully logs in using their credentials, a JWT will be returned to the client and stored locally for subsequent access.

```js
// server verifies user login credentials, authenication successful
// sever generates a jwt_token
const jwt_token = jwt.sign(payload, secret, [options, callback])

// server responds to the login POST request with the jwt_token
res.send({ jwt_token })

// client stores it locally for subsequent request to protected resource
localStorage.jwt_token = jwt_token
```

> Since tokens are credentials, great care must be taken <u>to prevent security issues</u>. In general, you should **not keep tokens longer than required**. You also should **not store sensitive session data in browser storage** due to lack of security. 

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the `Authorization` header using the `Bearer` schema.

```js
axios.get('/protected_resource', { 
  headers: {
    Authorization: `Bearer ${localStorage.jwt_token}`
  }
})
```
This can be, in certain cases, **a stateless authorization mechanism**.

The server's protected routes will check for a valid JWT in the `Authorizatioin` header, and if it's present, the user will be allowed to access protected resources. 

If the JWT contains the necessary data, the need to query the database for certain operations may be reduced, though this may not always be the case.

```js
app.get('/protected_resource', jwt.verify(token, secret, [options]), (req, res) => {
  const payload_data = req.auth
  // use payload_data to query the database unless the payload already contains the data, for example, the needed user details

  // return protected data
  res.send({ data })
})
```

Note that <u>if you send JWT tokens through HTTP headers,</u> **you should try to prevent them from getting too big**. Some servers don't accept more than 8KB in headers. 

> If you are <u>trying to embed too much information in a JWT token</u>, like by including *all the user's permissions*, you may need <u>an alternative solution</u>, like **"Auth0 Fine-Grained Authorization"**.

Do <u>**note** that with *signed tokens*</u>, 
- all the <u>information contained within the token is exposed to users or other parties</u>, even though they are unable to change it. 
- This means **you should not put secret inforation within the token**. 
- **<u>The payload portion of the token can be Base64 decoded</u>**.

---

> Check the **express-jwt** library (or that of your language framework) to learn more implementation details.