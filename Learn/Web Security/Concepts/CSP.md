# Intro
**Content Security Policy** (CSP) is an added layer of <u>security that helps to detect and mitigate</u> certain types of attakcks, including **XSS** and **data injection** attacks.

**To enable CSP**, you need to <u>configure your web server to return `Content-Security-Policy` HTTP header</u>.

# Threats
## Mitigating XSS
**A primary goal of CSP** is to <u>mitigate and report XSS attacks</u>.

**XSS attacks exploit** <u>the browser's trust in the content received from the server</u>

> "Exploit" means, what an attack took advantage of.\
> XSRF attacks exploit the server's trust in the request received from the client

**Malicious scripts are executed by the victim's browser** <u>*because* the browser trusts the source of the content</u>, *even when it's not coming from where it seems to be coming from*.

CSP makes it possible for  <u>*server administrators*</u> to **reduce or eliminate the vectors by which XSS can occur** <u>by **specifying the domains** that the browser should consider to be **valid sources** of executable scripts</u>.

A CSP compatible <u>browser will then *only* execute scripts loaded in source files received from those allowed domains</u>, ignoring all other scripts (includidng incline scripts and event-handling HTML attributes).

As an ultimate form of protection, sites that want to never allow scripts to be executed can opt to globally disallow script execution.

## Mitigating packet sniffing attacks
In addtion to the above, the <u>*server*</u> can also <u>**specify which *protocols* are  allowed** to be used;</u> 
for example, a server can specify that all content must be loaded using HTTPS.

> **A complete data transmission security strategy** includes not only <u>enforcing HTTPS for data transfer</u>, but also <u>marking all cookies with the `Secure` attribute</u> and <u>providing automatic redirects from HTTP pages to their HTTPS counterparts</u>.

Sites may also use the **`Strict-Transport-Security` HTTP header** <u>to ensure that browsers connect to them only over an encrypted channel</u>.

# Using CSP
You **specify** in the `Content-Security-Policy` HTTP response header, <u>***values to control* what resources the user agent is allowed to load for that page**</u>.
- For example, a page that uploads and displays images could <u>allow images from anywhere, but restrict a form action to a specific endpoint</u>.

> A properly designed CSP helps protect a page against a XSS attack.

## Specifying your policy
```http
Content-Security-Policy: policy
```
The policy is <u>a string containing the **policy directives**</u> describing your CSP.

## Writing a policy
A policy is described using <u>a series of policy directives</u>, **each** of which **describes the policy for a certain resource type** of policy area.
- Your policy **should include** a `default-src` policy directive, which is <u>a fallback for other resource types when they don't have policies of ther own</u>.
- A policy **needs to include** a `script-src` to <u>prevent inline scripts from running</u>, as well as <u>blocking the use of `eval()`</u>
- A policy **needs to include** a `style-src` directive to <u>restrict inline styles from being applied</u> from a `<style>` element of `style` attibute.


There are **specific policy directives for a wide variery of types of items**, so that each type can have its own policy, including <u>fonts, frames, images audio and video media, scripts, and workers</u>.
> Check the `Content-Security-Policy` header reference for details.

## Examples Common use cases
**The pattern** includes an `{item_type}-src` directive, followed by one or more valid domain values, ending with a semicolon (provided more directives follow).

```js
(default | img | script | ...)-src domain1 domain2 ...; ...
```

> The domain value(s) specified for the `default-src` directive, will be assumed for all other `{item_type}-src` directives, unless explicitly specified.
> - <u>Think of it like</u> `all-src ...; except-src ...` \
> Where `all` refers to **for all** `{item_types}`s and `except` refers to **a specific** `{item_type}`.

> "`self`" is a special domain that indicates <u>the domain of the document's origin</u>, i.e. the current web page's domain.

> " `*` " refers to <u>any</u> domain. If included, it *must be the only one in the list of domains*.

> Item type contents can be loaded from any of the specified domains for a particular `{item_type}-src` directive.

```http
Content-Security-Policy: default-src 'self'

Content-Security-Policy: default-src 'self' example.com *.example.com

Content-Security-Policy: default-src 'self'; img-src *; media-src example.org example.net; script-src userscripts.example.com

Content-Security-Policy: default-src https://onlinebanking.example.com

Content-Security-Policy: default-src 'self' *.example.com; img-src *
```

# Testing your policy
To ease deployment, CSP can be deployed in **report-only mode**. <u>The policy is not enforced, but any violations are reported to a provided URI.</u>

Additionally, **a report-only header** can be used <u>**to test** a future revision to a policy without actually deploying it</u>.
  - > Say you want to improve the old `CSP` header, you can use the `CSPRO` header as a prototype until you're satisfied, then moving your modifications to the actual `CSP` header.

```http
Content-Security-Policy-Report-Only: policy
```

**If both** a `Content-Security-Policy-Report-Only` header and a `Content-Security-Policy` header **are present in the same response**, both policies are honored. <u>The latter is enforced, while the former *only* generates reports.</u>

## Enabling reporting

To enable violation reporting, you need to specify (in `CSP` or `CSPRO`) <u>the `report-to` policy directive, providing at least one URI to which reports are delivered.</u>

```http
Content-Security-Policy: default-src 'self'; report-to http://reportcollector.example.com/csp_report
```

Then you need to set up your server to receive the reports; it can store or process them in whatever manner you determine is appropriate.

```js
router.post("/csp_report", (req, res) => {
  const cspReport = req.body;
  /* Content-Type is "application/csp-report" */

  console.log(cspReport)

  res.end();
})
```

## Violation report syntax
This is what `console.log(cspReport)` above will log.

```json
{
  "csp-report": {
    "blocked-uri": /* domain that violates the CSP */,
    "disposition": ("report" /* CSPRO is used */ | "enforced" /* CSP is used */),
    "document-uri": /* the URI of the current document */,
    "effective-directive": /* the CSP or CSPRO directive that was violated */,
    "original-policy": /* the contents of your CSP or CSPRO header */,
    "referrer": /* the current document's refererr header */,
    "status-code": /* HTTP status code of the current document */,
    "violated-directive": /* same as "effective-directive" */
  }
}
```

---

> **Where/When to use CSP?**\
Use CSP <u>when you're not in control of the frontend</u>. For example, when building **a public API** or **a web hosting server**. If you're building a private API, you know what and what not to include in the frontend.