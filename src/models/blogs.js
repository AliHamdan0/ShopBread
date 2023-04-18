const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Blogs', blogsSchema);
