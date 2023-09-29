import express from 'express'
import { client, db } from "./lib/mongodb-conn.js"

const app = express()

const run = async () => {
  try {
    await db.collection('inventory').insertMany([
      {
        item: 'journal',
        qty: 25,
        size: { h: 14, w: 21, uom: 'cm' },
        status: 'A'
      },
      {
        item: 'notebook',
        qty: 50,
        size: { h: 8.5, w: 11, uom: 'in' },
        status: 'P'
      },
      {
        item: 'paper',
        qty: 100,
        size: { h: 8.5, w: 11, uom: 'in' },
        status: 'D'
      },
      {
        item: 'planner',
        qty: 75,
        size: { h: 22.85, w: 30, uom: 'cm' },
        status: 'D'
      },
      {
        item: 'postcard',
        qty: 45,
        size: { h: 10, w: 15.25, uom: 'cm' },
        status: 'A'
      }
    ]);


  } catch (e) {
    console.log(e)
  }
}

app.listen("5000", async () => {
  console.log('server started')
  await client.close()
  await client.connect()
  run()
})