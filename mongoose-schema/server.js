const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.set( 'useCreateIndex', true ); // to remove decprecation warning collection.ensureIndex
// mongoose.connect( uri, { useCreateIndex: true });
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

//To remove deprecation warning...
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.post("/submit", async function (req, res){

  const userInfo = req.body;
  console.log(`User Info: `, userInfo)
  try {
    let resultData = await User.create(userInfo);
    res.send(resultData);
  } catch{
    console.log( `...sorry there was an error inserting user info`, err)
    res.send(err);
  }
// app.post("/submit", ({ body }, res) => {
  // User.create(body)
  //   .then(dbUser => {
  //     res.json(dbUser);
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
