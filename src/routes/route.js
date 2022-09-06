const express = require('express');
const router = express.Router();
// const AuthorModel = require('../models/author')
const AuthorController= require('../controllers/authorController')
const BlogController= require('../controllers/blogController')


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post('/authors', AuthorController.createAuthor)
router.post("/blogs", BlogController.createBlog)
router.get('/blogs', BlogController.getBlogs)
router.put('/blogs/:blogId', BlogController.updateBlogs)
router.delete('/blogs/:blogId', BlogController.deleteBlogsById)
router.delete('/blogs', BlogController.deleteBlogs)

module.exports = router