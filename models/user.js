const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "There's no way your parents call you with a single letter"],
    maxLength: [30, "You're not Nicholas the II, whose title is longer than the whole War & Peace novel"],
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Please enter the valid URL',
    },
  },
});
module.exports = mongoose.model('user', userSchema);
