const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')


//-------------------------------------Blog PostApi-----------------------------------------------------------
const createBlog = async function (req, res) {
    try {
        let data = req.body
        if (!(data)) res.status(400).send({ status: false, msg: "Bad Request" })
        let id = data.authorId
        let findid = await AuthorModel.findById(id)
        if (!(findid)) res.status(404).send({ status: false, msg: "Invalid authorId. Author Not Found " })
        let savedData = await BlogModel.create(data)
        return res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}


//-------------------------------------get Api -----------------------------------------------------------

const getBlogs = async function (req, res) {
    try {
        let data = req.query

        if (Object.keys(data).length !== 0) {
            //if(data == [ ])
            let requireblogs = await BlogModel.find({ isDeleted: false, isPublished: true }, data).populate('authorId')
            return res.status(200).send({ msg: "  require Blogs", status: true, data: requireblogs })
        }
        const getblogs = await BlogModel.find({ isDeleted: false, isPublished: true }).populate('authorId')
        return res.status(200).send({ msg: "All Blogs", status: true, data: getblogs })

    }
   

    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

//-------------------------------------update Api-----------------------------------------------------------
const updateBlogs = async function (req, res) {
    try {

        let blogId = req.params.blogId
        if (!blogId) {
            return res.status(404).send({ status: false, msg: "NOT FOUND" })
        } else {
            let isDeleted = await BlogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })
            if (isDeleted.isDeleted == true) { return res.status(404).send({ status: false, msg: "Blog not found" }) }
            let data = req.body
            if ((data.publishedAt)) {
                let publishedupdate = await BlogModel.findOneAndUpdate(
                    { _id: blogId },
                    { $set: data, isPublished: true },
                    { new: true }
                )
                return res.status(200).send({ status: true, msg: "Done", data: publishedupdate })

            }
            if (!data) {
                return res.status(400).send({ status: false, msg: "BAD REQUEST" })
            } else {
                let allBooks = await BlogModel.findByIdAndUpdate(
                    { _id: blogId },
                    { $set: data },
                    { new: true }
                )
                return res.status(200).send({ status: true, data: allBooks })
            }
        }
    } catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}
//-------------------------------------deltebyid-----------------------------------------------------------
const delteBlogsById = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (!blogId) {
            return res.status(404).send({ status: false, msg: "NOT FOUND" })
        } else {
            let isDeleted = await BlogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })
            if (isDeleted.isDeleted == true) { return res.status(404).send({ status: false, msg: "Already deleted" }) }
            let deleteblogs = await BlogModel.findByIdAndUpdate(
                { _id: blogId },
                { $set: { isDeleted: true } },
                { new: true }
            )
            return res.status(200).send({ msg: "Blog deleted successful", status: true })
        }
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}
//-------------------------------------deletebyparam-----------------------------------------------------------

const deleteBlogs = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length === 0) {
            res.status(400).send({ status: false, msg: "No filter found to delete blogs" })
        } else {
            let blogsDeleted = await BlogModel.updateMany(
                { data },
                { $set: { isDeleted: true } }
            )
            return res.status(200).send({ status: true, msg: "Blogs deleted successfully" })
        }
    } catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}




module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.delteBlogsById = delteBlogsById
module.exports.deleteBlogs = deleteBlogs

