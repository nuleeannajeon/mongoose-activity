const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetsSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Please enter a title'
    },
    thumbnail: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Tweets", tweetsSchema);;