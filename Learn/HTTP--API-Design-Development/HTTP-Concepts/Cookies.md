# HTTP Cookies: Intro
An HTTP cookie is a small piece of data that a server sends to a user's web browser (on response). The browser may store the cookie and send it back (on request) to the same server with later requests.

Typically, an HTTP cookie is <u>**used to tell if two requests come from the same browser**</u>. It <u>remembers stateful information</u> for the stateless HTTP protocol.

## Cookies are <u>mainly used for **three purposes**</u>:

**Session manangement:** Logins, shopping carts, game scores, or anything else that the server should remember.
- If we set an expiration on a cookie, we can say we've established something like a session, since the browser will never send back an expired cookie. *"Remember this information for this length of time"*.

**Personalization:** User preferences, themes, and other settings.
- If the server stores a user's setting in a cookie (to sytlize the browser UI, for example), subsequent cookie attacthment by the browser makes the server remember user settings for the user.
- This is now better done with client side storage mechanisms. Since the browser is technically the user, it can store its preferences for itself.

**Tracking:** Recording and analyzing user behaviour.
- Every request to our server always send back the cookie that it had set. Even if its accessed indirectly from another origin. Now this indirect access is the magic, the referrer header points to the origin where the indirect request is coming from. We can use this header to know where the client is coming from and keep a log for it.

# Creating cookies
After receiving an HTTP request,
- a server can send one or more `Set-Cookie` headers with the response.
- The browser usually <u>stores the cookie</u> and <u>sends it with requests made to the same server</u> inside a `Cookie` HTTP header.

## The `Sec-Cookie` and `Cookie` headers

Refer to your server-side language documentation on how to set these headers, and specify its options.

You can set more than one cookie at once.

## Define Lifetime of a cookie

**Session cookies** are deleted when the current session ends (browser-defined). Session cookies may last indefinitely as some browsers automatically restores session when restarting.

**Permanent cookies** are deleted at a date specified by the `Expires` or after a time period specified by the `Max-age` attribute.

## Restrict access to cookies
**`Secure` attribute** ensures only an HTTPS secured server can set cookie and only an HTTPS secured client can send cookies.

**`HttpOnly` attribute** ensures that the browser's cookie jar is inaccessible to JavaScript through the `document.cookie` API. Protecting it from XSS attacks.

## Define where cookies are sent
### The `Domain` attribute

specifies <u>which host can receive a cookie</u>.
- If not specified, the same host that sets the cookie is used, *excluding subdomains*.
- If specified, the subdomains of the specified domain are included.
- The first is generally common, and the second is common for domains with subdomains.

### `Path` attribute

indicates that <u>this path must be present in the request URL</u> for this cookie to be attached to it. Sub directories match as well.

### `SameSite` attribute

lets specify <u>whether/when cookies are sent with cross-site requests</u> (i.e. requests from an origin site different from the cookie's origin site). This provides some protection against cross-site request forgery attacks (CSRF).
  - `Strict` : the browser <u>only sends the cookie with requests from the cookie's origin site</u>.
  - `Lax` : same as `Strict` except the browser <u>also sends the cookie when the user navigates to the cookie's origin site via an external link on a different site</u>. This is the **default** if `SameSite` attribute isn't specified.
  - `None` : cross-site requests are allowed, <u>but **only in secure contexts**</u>. This value mandates that the `Secure` attribute is also set.

**Note:** <del>same domain with different schemes</del> are not cosidered same site.

## Cookie prefixes

Because of the design of the cookie mechanism, a server can't confirm that a coolie was set from a secure origin or even tell where a cokie was originally set.

A vulnerable application on a subdomain can set a cookie with the `Domain` attribute, which gives access to that cookie on all other subdomains. This mechanism can be abused in a session fixation attack.

We can use cookie prefixes to assert specific facts about the cookie.

If a <u>cookie name</u> has {below} prefix, it's accepted in a `Set-Cookie` header only if

### `__Host-`
- it's also marked with the `Secure` attribute,
- it *does not include* a `Domain` attribute,
- it has the `Path` attribute set to `/`.

This way, these cookies can be seen as **"domain-locked"**.

### `__Secure-`

- it's marked with the `Secure` attribute. This is weaker than the `__Host-` prefix.

The browser will reject cookies with these prefixes that don't comply with their restrictions. Note that this <u>ensures that subdomain-created cookies with prefixes are either confinde to the subdomain or ignored completely</u>.
As the application server only checks for a specific cookie name when determining if the user is authenticated or a CSRF token is correct, this effectively acts as a defense measure against session fixation.

# Security
> **Note:** When you store <u>information in cookies</u>, keep in mind that all cookie values <u>are visible to, and can be changed by, the end user</u>. \
\
> Depending on the application, you may want to <u>use an opaque identifier</u> (e.g. express-session ID) that the server looks up, or investigate **alternative authentication/authorization mechanisms such as JWT**.

Ways to mitigate attacks involving cookies:
- Use the `HttpOnly` attribute to prevent access to cookie values via JavaScript.
- Cookies used for sensitive information should have a short lifetime, with the `SameSite` attribute set to `Strict` or `Lax`.

✨All cookie attacking issues can be mitigated by not using cookie/session authentication in the first place. Just use JWT token-based authentication. A big web app would definitely send requests to different servers to serve client. 🎯

# Tracking and privacy
## Third-party cookies
If a cookie domain and scheme doesn't match the current page, it's a third-party cookie, otherwise, it's a first-party cookie.

While the server hosting a web page sets first-party cookies, <u>the page may contain images or other components stored on servers in other domains (e.g. ad banners) that may set third-party cookies</u>. **These are mainly used for advertising and tracking across the web**.

A third-party server can create a profile of a user's browsing history and habits based on cookies sent to it by the same browser when accessing multiple sites. Via the `Referrer` header.

## Cookie-related regulations
These regulations include requirements such as:
- Notifying users that your site uses cookies.
- Allowing users to opt out of receiving some or all cookies.
- Allowing users to use the bulk of your service without receiving cookies.

There may be other regulations that govern the use of cookies in your locality. The burden is on you to know and comply with these regulations. <u>There are companies that offer **"cookie banner" code that helps you comply with these regulations**</u>.

> See `Set-Cookie` and `Cookie` documentation for details.