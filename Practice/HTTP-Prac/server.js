const fs = require("fs");
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

app.get("/", (req, res) => {
  const readable = fs.createReadStream("text.txt", { encoding: "utf-8" });
  readable.pipe(res);
  // res.json(process.memoryUsage());
});

app.listen(3000, () => {
  console.log("Visit http://localhost:3000");
});
