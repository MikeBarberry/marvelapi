const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const path = require('path')
const cors = require("cors")
const mongoose = require("mongoose")

const hero = require("./routes/api/hero")

const app = express()

const db = require("./config/keys").mongoURI

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((database) => {
        console.log("Successfully connected to: " + database.connections[0].host)
    })
    .catch((err) => {
        console.log("Error connecting to database: " + err)
    })

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb", }));

app.use(express.static(path.join(__dirname, "../client/build")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
})

app.get("/ping", (req, res) => {
  return res.send("pong")
})

app.use("/api/hero", hero)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Marvel API server running on PORT: ${port}`)
})
