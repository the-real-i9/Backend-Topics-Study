# What is JSON Web Token?

# The Authentication Flow
> Using **express-jwt** library
1. The user logs in on the frontend.
2. The backend authenticates the user, and if all's good, responds with a JSON Web token.
```js
// coming...
```
3. Then client stores this token locally and includes it with every request to a protected route in the **Authorization** header.
```js
localStorage.appJwtToken = token
Authorization: `Bearer ${token}`
// Note: To access this token, you have to strip away this 'Bearer%space%' part from the string.
```
4. The backend verifies this token and decides whether to allow or revoke access to the resource.
```js
coming...
```
Notice that unlike Basic Auth, the user data is not stored in a session database, but rather, in the token.
> Check the **express-jwt** library to learn more implementation details.