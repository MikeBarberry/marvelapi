/* hide for heroku deploy; show for dev 
 const dotenv = require("dotenv")
dotenv.config( {path:'../.env'} )  
*/

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")

// added for heroku deploy 
const path = require('path')
//

const hero = require("./routes/api/hero")

const app = express()

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

// db connnect
mongoose.connect('mongodb+srv://mikebarberry:cZZ00nmiP21*@marvel-api.c0k3o.mongodb.net/marvel-api', { useNewUrlParser: true, useUnifiedTopology: true });

// build for heroku; hide for dev 
app.use(express.static(path.join(__dirname, "../client/build")))
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
