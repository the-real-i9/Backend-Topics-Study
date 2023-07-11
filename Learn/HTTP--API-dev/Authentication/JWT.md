# The Authorization Flow
1. The user logs in on the frontend.
2. The backend authenticates the user, and if all's good, responds with a `jsonwebtoken`.
```js
const jwtToken = jwt.sign(...params)
```
3. Then client stores this token locally and includes it with every request to a protected route in the **Authorization** header.
```js
localStorage.appJwtToken = token
Authorization: `Bearer ${token}`
// Note: To access this token, you have to strip away this 'Bearer%space%' part from the string.
```
4. The backend verifies this token and decides whether to allow or revoke access to the resource.
```js
const data = jwt.verify(...params)
// either responds with data, or throws an invalid token error
```
Notice that unlike Basic Auth, the user data is not stored in a session database, but rather, in the token.
> Check the **jsonwebtoken** library to learn more implementation details.