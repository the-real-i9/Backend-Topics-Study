const http = require("http");
const express = require("express");

const app = express();

app.use(express.text());
app.use(express.json());

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    Programmer: "Mckenney",
  });
  next();
});

app.get("/", (clientReq, clientRes) => {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  };

  /* This is a reverse proxy */
  const proxyReq = http.request(options, (proxyRes) => {
    clientRes.set(proxyRes.headers);
    proxyRes.pipe(clientRes);
  });

  clientReq.pipe(proxyReq);
});

app.listen(5000, () => {
  console.log("Proxying at http://localhost:5000");
});
