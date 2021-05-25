const NODE_ENV = "production"

if (NODE_ENV === "development") {
  const dotenv = require("dotenv")
  dotenv.config( {path:'../.env'} )
}

const express = require("express")
const path = require('path')
const cors = require("cors")
const mongoose = require("mongoose")

const hero = require("./routes/api/hero")

const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then((database) => {
  console.log("Successfully connected to: " + database.connections[0].host)
})
.catch((err) => {
  console.log("Error connecting to database: " + err)
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb", }));

if (NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
  })
}

app.get("/ping", (req, res) => {
  return res.send("pong")
})

app.use("/api/hero", hero)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Marvel API server running on PORT: ${port}`)
})
