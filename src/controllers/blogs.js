const Blogs = require('../models/blogs');
const asyncHandler = require('express-async-handler');

// get all blogs
//filter on name
// GET /blogs
// private
const getAllBlogs = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const page = parseInt(req.query.page) - 1 || 0;
  let size = 3;
  let blogs;
  let count;
  if (search != '' && search != null) {
    blogs = await Blogs.find({ title: { $regex: search?.toLowerCase() } })
      .skip(page * size)
      .limit(size);
    count = await Blogs.find({
      title: { $regex: search?.toLowerCase() },
    }).count();
  } else {
    blogs = await Blogs.find()
      .skip(page * size)
      .limit(size)
      .sort({ date: -1 });
    count = await Blogs.find().count();
  }
  if (!blogs) {
    res.status(500);
    throw new Error('could not get the blogs from the database');
  }
  res.status(200).json({ blogs, count });
});

// get top 3 blogs
//filter on title
// GET /topBlogs
// private
const getTopBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blogs.find().sort({ date: -1 }).limit(3);
  res.status(200).json({ blogs });
});

module.exports = {
  getAllBlogs,
  getTopBlogs,
};
