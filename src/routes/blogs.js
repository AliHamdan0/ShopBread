const { Router } = require('express');
const { getAllBlogs, getTopBlogs } = require('../controllers/blogs');
const validateToken = require('../middlewares/validateTokenHandler');

const blogRouter = Router();
// blogRouter.use(validateToken);

blogRouter.get('/blogs', getAllBlogs);
blogRouter.get('/topBlogs', getTopBlogs);

module.exports = blogRouter;
