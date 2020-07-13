const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: 'Username is Required'
  },

  password: {
    type: String,
    trim: true,
    required: true,
    validate: [({ length }) => length >= 6, "Password should be longer."]
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },

  userCreated: {
    type: Date,
    default: Date.now
  }

});

const User = mongoose.model("User", UserSchema);

module.exports = User;
// * In `userModel.js` add four attributes to your schema.

//   * username: A string that will be be required, and also trimmed.

//   * password: A string that will be required, trimmed, and at least 6 characters.

//   * email: A string that must be a valid email address and unique in our collection.

//   * userCreated: A date that will default to the current date.