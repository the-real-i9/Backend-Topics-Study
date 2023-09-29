import express, { json, text } from "express";

import { sync } from "./lib/db-conn";
import { User, Post, Branch } from "./models/db-models";

const app = express();

app.use(require("cors")());

app.use(json());
app.use(text());

app.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: 1 } });
    /* Sequelize special method due to associations */
    // await user.createPost({ content: "This is another post created by Kehinde Ogunrinola", userId: user.id })
    res.json(await user.getPosts());
  } catch (error) {
    console.error(error)
    res.end()
  }
});

(async () => {
  try {
    await sync(/* { force: true } */);
    // await Promise.all([Post.sync(), User.sync()])
    console.log("DB synced.");
    // await User.create({ name: "Kehinde Ogunrinola" })
    app.listen(5000, () => {
      console.log("Server started at http://localhost:5000");
    });
  } catch (e) {
    console.log(e);
  }
})();
