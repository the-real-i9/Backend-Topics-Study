const express = require('express')
const session = require('express-session')

const app = express();

app.use(session({
  secret: "my-secret",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
  }
}))

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1
  }

  res.send(`This page has been viewed ${req.session.views} times`)
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000")
})