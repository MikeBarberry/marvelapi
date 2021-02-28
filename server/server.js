/* const dotenv = require("dotenv")
dotenv.config( {path:'../.env'} )  */
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")

const hero = require("./routes/api/hero")

const app = express()

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

// db connnect

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

//build 

// Client build
app.use(express.static(path.join(__dirname, "../client/build")))

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"))
})

//routes
app.get("/ping", (req, res) => {
  return res.send("pong")
})

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
  res.send({
      time: req.time
    });
  }
);

app.use("/api/hero", hero)

// Start server
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Marvel API server running on PORT: ${port}`)
})
