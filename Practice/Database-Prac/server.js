const express = require("express");

const dbClient = require("./lib/db-conn");
const { Branch, Staff } = require("./models/db-models");

const app = express();

app.use(require("cors")());

app.use(express.json());
app.use(express.text());

app.get("/", (req, res) => {
  res.send("App Working!");
});

app.post("/new_branch", async (req, res) => {
  try {
    const { body } = req;
    const branch = await Branch.create(body);
    res.status(201).json(branch);
  } catch (e) {
    console.log(e);
  }
});

app.post("/new_staff", async (req, res) => {
  try {
    const { body } = req;
    const staff = await Staff.create(body);
    // const readable = fs.createReadStream();
    res.status(201).json(staff);
  } catch (e) {
    console.log(e);
  }
});

(async () => {
  try {
    await dbClient.sync();
    console.log("DB synced.");
    app.listen(5000, () => {
      console.log("Server started at http://localhost:5000");
    });
  } catch (e) {
    console.log(e);
  }
})();
