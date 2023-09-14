const express = require('express')
const session = require('express-session')

const app = express();

app.use(session({
  secret: "my-secret",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 10 * 1000,
    secure: false,
  }
}))

/* app.get("/logout", (req, res) => {
  req.session.views = undefined

  res.send("You logged out")
}) */

app.get('/', (req, res) => {
  req.session.views = req.session.views ? req.session.views + 1 : 1;

  /* If this was a POST login route, you can do `req.session.user = user` on successful login */

  res.send(`This page has been viewed ${req.session.views} times`)
});


app.listen(3000, () => {
  console.log("Listening on http://localhost:3000")
})