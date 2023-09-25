// const express = require("express");
const { QueryTypes } = require("sequelize")

const dbClient = require("./lib/ddm_db-conn");

// const app = express();

(async () => {
  try {
    const result = await dbClient.query('SELECT * FROM actor', { type: QueryTypes.SELECT })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
})()


/* const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}) */
