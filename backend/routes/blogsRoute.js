const express = require("express");
const auth = require("../middleware/authMiddleware.js")
const {blogs, userBlogs, getBlogsId, putBlogsId, deleteBlog, postBlog, likeBlog, unlikeBlog} = require("../controller/blogController.js");

const router = express.Router();

router.get('/blogs',auth, blogs);

router.get('/userblogs/:id', auth, userBlogs);

router.get('/blogs/:id', auth, getBlogsId);

router.put('/blogs/:id', auth, putBlogsId);

router.delete('/blogs/:id', auth,  deleteBlog);

router.post('/blogs/', auth, postBlog);

router.put('/likeblog/:id', auth, likeBlog);

router.put('/unlikeblog/:id', auth, unlikeBlog);

module.exports = router;