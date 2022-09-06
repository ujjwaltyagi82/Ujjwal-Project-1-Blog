const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')

const createBlog = async function (req, res) {
    try {
        let data = req.body
        if (!(data)) res.status(400).send({ status: false, msg: "Bad Request" })
        let id = data.authorId
        let findid = await AuthorModel.findById(id)
        if (!(findid)) res.status(404).send({ status: false, msg: "Invalid authorId. Author Not Found " })
        let savedData = await BlogModel.create(data)
        return res.status(201).send({ status: true, msg: savedData })
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

const getBlogs = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).lenght !== 0) {
            let data = req.query
            if (Object.keys(data).lenght !== 0) {
                const requireblogs = await BlogModel.find({ isDeleted: false, isPublished: true }).populate('authorId')
                return res.status(200).send({ msg: "Require Blogs", status: true, data: requireblogs })
            }
            let getblogs = await BlogModel.find({ isDeleted: false, isPublished: true }).populate('authorId')
            return res.status(200).send({ msg: "All Blogs", status: true, data: getblogs })
        }
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params
        if (!blogId) {
            res.status(404).send({ status: false, msg: "NOT FOUND" })
        } else {
            let data = req.body
            if(!data){
                res.status(400).send({ status: false, msg: "BAD REQUEST" })
            }
            let allBooks = await BlogModel.updateMany(
                { _id: blogId },
                { $set: { data } },
                { new: true }
            )
            res.status(200).send({ status: true, msg: allBooks })
        }
    } catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs