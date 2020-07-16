const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter an username'
    },
    location: String,
    tweets: [
        { type: Schema.Types.ObjectId, ref: 'Tweets' }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Users", userSchema);;