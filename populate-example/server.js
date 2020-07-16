const express = require("express");
// const logger = require("morgan");
const mongoose = require("mongoose");

const db = require( './models');
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/twoterdb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// db.Users = reuiqre( 'models/users.js' );
// db.Tweets = require( 'models/tweets.js' );


app.get('/tweets', async function (req,res){
    console.log(`GET`)
    const userList = await db.Users.find({}).populate('tweets');

    res.send(userList);
})

app.post('/tweets', async function (req, res){
    console.log( `[POST] /tweets, body: `, req.body );
    let postingUser
    let postedUser = await db.Users.create({ name: req.body.name });

    if( postingUser._id == 0){
        postingUser = await db.Users.find({ name: req.body.name })
        console.log( `...added new user`, postingUser._id)
    }
    else{
        console.log( `id existed already: `, postingUser._id)
    }

    let postedTweet = await db.Tweets.create({ 
        title: req.body.title,
        thumbnail: req.body.thumbnail
    })

    const updateResult = await db.Users.updateOne({ name: req.body.name }, { $push: { tweets: postedTweet._id } })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});