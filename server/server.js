// hide for heroku deploy; show for dev 
const NODE_ENV = "development"

if (NODE_ENV === "development") {
  const dotenv = require("dotenv")
  dotenv.config( {path:'../.env'} )
}

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path')
const hero = require("./routes/api/hero")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

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
