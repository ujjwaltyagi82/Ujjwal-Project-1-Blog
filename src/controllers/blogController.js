const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')
<<<<<<< HEAD
=======

//--------------------------------------------------------CREATE BLOG---------------------------------------------------------------
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860


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

<<<<<<< HEAD

//-------------------------------------get Api -----------------------------------------------------------
=======
//--------------------------------------------------------GET BLOGS-----------------------------------------------------------------
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860

const getBlogs = async function (req, res) {
    try {
        let data = req.query
<<<<<<< HEAD

        if (Object.keys(data).length !== 0) {
            //if(data == [ ])
            let requireblogs = await BlogModel.find({ isDeleted: false, isPublished: true }, data).populate('authorId')
            return res.status(200).send({ msg: "  require Blogs", status: true, data: requireblogs })
=======
        if (Object.keys(data).length !== 0) {
            let requireblogs = await BlogModel.find({ isDeleted: false, isPublished: true }, data).populate('authorId')
            return res.status(200).send({ msg: "Required Blogs", status: true, data: requireblogs })
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
        }
        const getblogs = await BlogModel.find({ isDeleted: false, isPublished: true }).populate('authorId')
        return res.status(200).send({ msg: "All Blogs", status: true, data: getblogs })
    }
<<<<<<< HEAD
   

=======
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

<<<<<<< HEAD
//-------------------------------------update Api-----------------------------------------------------------
=======
//--------------------------------------------------------UPDATE BLOGS---------------------------------------------------------------

>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (!blogId) {
            return res.status(404).send({ status: false, msg: "NOT FOUND" })
        } else {
            let check = await BlogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })
            if (check.isDeleted == true) { return res.status(404).send({ status: false, msg: "Blog not found" }) }
            let data = req.body
<<<<<<< HEAD
            if ((data.publishedAt)) {
                let publishedupdate = await BlogModel.findOneAndUpdate(
                    { _id: blogId },
                    { $set: data, isPublished: true },
                    { new: true }
                )
                return res.status(200).send({ status: true, msg: "Done", data: publishedupdate })

            }
=======
            // let updateData= data
            // if ((data.publishedAt)) {
            //     let publishedupdate = await BlogModel.findOneAndUpdate(
            //         { _id: blogId },
            //         { $set: data },
            //         { new: true }
            //     )
            //     return res.status(200).send({ status: true, msg: "Done", data: publishedupdate })
            // }
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
            if (!data) {
                return res.status(400).send({ status: false, msg: "BAD REQUEST" })
            } else {
                let allBooks = await BlogModel.findByIdAndUpdate(
                    { _id: blogId },
<<<<<<< HEAD
                    { $set: data },
                    { new: true }
                )
                return res.status(200).send({ status: true, data: allBooks })
=======
                    { $set: {isPublished: true, publishedAt: Date.now()}, data },
                    { new: true }
                )
                return res.status(200).send({ status: true, msg: allBooks })
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
            }
        }
    } catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}
<<<<<<< HEAD
//-------------------------------------deltebyid-----------------------------------------------------------
const delteBlogsById = async function (req, res) {
=======

//--------------------------------------------------------DELETE BLOGS BY ID----------------------------------------------------------

const deleteBlogsById = async function (req, res) {
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
    try {
        let blogId = req.params.blogId
        if (!blogId) {
            return res.status(404).send({ status: false, msg: "NOT FOUND" })
        } else {
            let check = await BlogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })
            if (check.isDeleted == true) { return res.status(404).send({ status: false, msg: "Already deleted" }) }
            let deleteblogs = await BlogModel.findByIdAndUpdate(
                { _id: blogId },
                { $set: { isDeleted: true, deletedAt: Date.now() } },
            )
            console.log(deleteblogs)
            return res.status(200).send({ msg: "Blog deleted successful", status: true })
        }
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}
//-------------------------------------deletebyparam-----------------------------------------------------------

<<<<<<< HEAD
=======
//--------------------------------------------------------DELETE BLOGS--------------------------------------------------------------

>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
const deleteBlogs = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length === 0) {
            res.status(400).send({ status: false, msg: "No filter found to delete blogs" })
        } else {
            let blogsDeleted = await BlogModel.updateMany(
                { data },
<<<<<<< HEAD
                { $set: { isDeleted: true } }
            )
=======
                { $set: { isDeleted: true, deletedAt: Date.now() } }
            )
            console.log(blogsDeleted)
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
            return res.status(200).send({ status: true, msg: "Blogs deleted successfully" })
        }
    } catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

<<<<<<< HEAD

=======
//--------------------------------------------------------EXPORTS-------------------------------------------------------------------
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogsById = deleteBlogsById
module.exports.deleteBlogs = deleteBlogs

<<<<<<< HEAD
=======
//-----------------------------------------------------------END-------------------------------------------------------------------
>>>>>>> e49fe7206f80c315f940d857463a5a88e7990860
