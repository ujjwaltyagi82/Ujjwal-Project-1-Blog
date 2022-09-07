const express = require('express');
const router = express.Router();
const AuthorController= require('../controllers/authorController')
const BlogController= require('../controllers/blogController')
const {authentication , authorisation} = require('../middlewares/middleware')


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post('/authors', AuthorController.createAuthor)
router.post("/blogs", authentication, BlogController.createBlog)
router.get('/blogs', authentication , BlogController.getBlogs)
router.put('/blogs/:blogId',authentication , authorisation, BlogController.updateBlogs)
router.delete('/blogs/:blogId',authentication , authorisation, BlogController.deleteBlogsById)
router.delete('/blogs',authentication , authorisation,BlogController.deleteBlogs)
router.post('/login', AuthorController.loginUser)


module.exports = router