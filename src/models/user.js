const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    default: '',
  },
  hobbies: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Users', userSchema);
