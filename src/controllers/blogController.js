const BlogModel = require('../models/blogModel')
const AuthorModel = require('../models/authorModel')
const { default: mongoose } = require('mongoose')
const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
const stringChecking = function (data) {
    if (typeof data !== 'string') {
        return false;
    } else if (typeof data === 'string' && data.trim().length == 0) {
        return false;
    } else {
        return true;
    }
}

const arrayOfStringChecking = function (data) {
    for (let i = 0; i < data.length; i++) {
        if (typeof data[i] !== 'string') {
            return false;
        } else if (typeof data[i] === 'string' && data[i].trim().length == 0) {
            return false;
        } else {
            return true;
        }
    }
}

//---------------------------------------------------------Blog PostApi-----------------------------------------------------------

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let loggedInuser = (req.decodedToken.authorId).toString()

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Blog details" })
        }
        let { title, body, authorId, category, tags, subcategory, isPublished } = data
        let datacreate = {}
        if (authorId) {
            if (!isValidObjectId(authorId)) {
                return res.status(400).send({ status: false, message: "Please enter valid authorId" })
            } if (authorId !== loggedInuser) {
                return res.status(403).send({ staus: false, message: "Person not authoriesed" })
            }
            datacreate.authorId = authorId
        }
        if (!StringChecking(title)) {
            return res.status(400).send({ status: false, message: "Title must be present and have Non empty string " })
        }
        datacreate.title = title
        if (!StringChecking(body)) {
            return res.status(400).send({ message: "Body must be present and have non empty string" })
        }
        datacreate.body = body
        if (!!stringChecking(category)) {
            return res.status(400).send({ status: false, message: "Category must be present and have Non empty string " })
        }
        datacreate.category = category
        if (subcategory) {
            if (!arrayOfStringChecking(subcategory)) {
                return res.status(400).send({ status: false, message: "Subcategory must be present and have Non empty string " })
            }
            datacreate.subcategory = subcategory
        }
        if (isPublished) {
            datacreate.isPublished = isPublished
            datacreate.publishedAt = new Date()
        }

        if (tags) {
            if (!arrayOfStringChecking(tags)) {
                return res.status(400).send({ status: false, message: "Tags must be present and have Non empty string " })
            }
            datacreate.tags = tags
        }


        let findid = await AuthorModel.findById(authorId)
        if (!(findid)) {
            return res.status(404).send({ status: false, message: "Invalid authorId. Author Not Found " })
        }
        let savedData = await BlogModel.create(datacreate)
        return res.status(201).send({ status: true, msg: "New Blog created successfully", data: savedData })
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

//--------------------------------------------------------GET BLOGS-----------------------------------------------------------------

const getBlogs = async function (req, res) {
    try {
        let bodyData = req.query

        if (Object.keys(bodyData).length == 0) {
            let getData = await BlogModel.find({ isDeleted: false, isPublished: true })
            if (getData.length <= 0) {
                return res.status(200).send({ status: true, count: getData.length, data: getData })
            }
        }
        else {
            let { subcategory, category, tags, authorId } = bodyData
            let filter = {}
            if (subcategory) {
                if (!arrayOfStringChecking(subcategory)) {
                    return res.status(404).send({ status: false, msg: "subcategory must be present and have Non empty string " })
                }
                filter.subcategory = subcategory
            }
            if (tags) {
                if (!arrayOfStringChecking(tags)) {
                    return res.status(404).send({ status: false, msg: "tags must be present and have Non empty string " })
                }
                filter.tags = tags
            }
            if (category) {
                if (!stringChecking(tags)) {
                    return res.status(404).send({ status: false, msg: "tags must be present and have Non empty string " })
                }
                filter.category = category
            }
            if (authorId) {
                if (!isValidObjectId(authorId)) {
                    return res.status(400).send({ status: false, msg: "please enter valid authorId" })
                }
                filter.authorId = authorId
            }
            filter.isDeleted = false
            filter.isPublished = true
            if (subcategory || category || tags || authorId || title || body) {
                let getDataByFilter = await BlogModel.find(filter)
                return res.status(200).send({ status: true, count: getDataByFilter.length, data: getDataByFilter })
            }
            else {
                return res.status(400).send({ status: false, msg: "Filters can be subcategory,category,tags,authorId, title or body only " })
            }
        }
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

//--------------------------------------------------------UPDATE BLOGS---------------------------------------------------------------

const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (!(blogId)){
            res.status(400).send({ status: false, message: "Please enter blogId" })
        }
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, message: "Please enter valid blogId in params" })
        } else {
            let check = await BlogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })
            if (check.isDeleted == true) {
                return res.status(404).send({ status: false, message: "Blog not found" })
            }
            let data = req.body
            if (Object.keys(data).length === 0) {
                return res.status(400).send({ status: false, message: "Please enter required details in request body" })
            } else {
                let { subcategory, tags, body, title } = data
                if (subcategory) {
                    if (!arrayOfStringChecking(subcategory)) {
                        return res.status(400).send({ status: false, message: "Subcategory must have Non empty string " })
                    }
                }
                if (tags) {
                    if (!arrayOfStringChecking(tags)) {
                        return res.status(400).send({ status: false, message: "Tags must have Non empty string " })
                    }
                }
                if (title) {
                    if (!stringChecking(title)) {
                        return res.status(400).send({ status: false, message: "Title must be Non empty string " })
                    }
                }
                if (body) {
                    if (!stringChecking(body)) {
                        return res.status(400).send({ status: false, message: "Body must have Non empty string " })
                    }
                }
                let allblogs = await BlogModel.findByIdAndUpdate(
                    { _id: blogId },
                    { $set: { title: title, body: body }, $addToSet: { tags: tags, subcategory: subcategory }, isPublished: true, publishedAt: new Date() },
                    { new: true }
                )
                return res.status(200).send({ status: true, message: allblogs })
            }
        }
    } catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

//--------------------------------------------------------DELETE BLOGS BY ID----------------------------------------------------------

const deleteBlogsById = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: "PLEASE PROVIDE A VALID BLOG ID" })
        } else {
            let check = await BlogModel.findById(blogId).select({ isDeleted: 1, _id: 0 })
            if (check.isDeleted == true) {
                return res.status(404).send({ status: false, msg: "Already deleted" })
            }
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

//--------------------------------------------------------DELETE BLOGS--------------------------------------------------------------

const deleteBlogs = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length === 0) {
            res.status(400).send({ status: false, msg: "No filter found to delete blogs" })
        } else {
            const tokenAuthorId = (req.decodedToken.authorId).toString()

            const { category, subcategory, tags, authorId, body, title } = data
            const filter = {}
            if (subcategory) {
                if (!arrayOfStringChecking(subcategory)) {
                    return res.status(400).send({ status: false, msg: "subcategory must be present and have Non empty string " })
                }
                filter.subcategory = subcategory
            }
            if (tags) {
                if (!arrayOfStringChecking(tags)) {
                    return res.status(400).send({ status: false, msg: "tags must be present and have Non empty string " })
                }
                filter.tags = tags
            }
            if (category) {
                if (!stringChecking(tags)) {
                    return res.status(400).send({ status: false, msg: "tags must be present and have Non empty string " })
                }
                filter.category = category
            }
            if (body) {
                if (!arrayOfStringChecking(body)) {
                    return res.status(400).send({ status: false, msg: "Body must be present and have Non empty string " })
                }
                filter.body = body
            }
            if (title) {
                if (!arrayOfStringChecking(title)) {
                    return res.status(404).send({ status: false, msg: "Title must be present and have Non empty string " })
                }
                filter.title = title
            }
            if (authorId) {
                if (!isValidObjectId(authorId)) {
                    return res.status(400).send({ status: false, msg: "please enter valid authorId" })
                }
                if (authorId !== tokenAuthorId) {
                    return res.status(403).send({ status: false, msg: "Person is not authorised" })
                }
            }
            filter.isDeleted = false
            filter.isPublished = false

            /////authorization///
            const blog = await BlogModel.find(filter)
            for (let i = 0; i < blog.length; i++) {
                console.log(blog[i].authorId, tokenAuthorId)
                if (((blog[i].authorId).toString()) !== tokenAuthorId) {
                    return res.status(403).send({ status: false, msg: "The blogs with this filters are forbidden for this logged in user" })
                }
            }
            let blogsDeleted = await BlogModel.updateMany(
                { filter },
                { $set: { isDeleted: true, deletedAt: Date.now() } }
            )
            console.log(blogsDeleted)
            if (blogsDeleted.modifiedCount === 0) {
                return res.status(400).send({ status: false, msg: "No data found" })
            }
            return res.status(200).send({ status: true, msg: "Blogs deleted successfully" })
        }
    } catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

//--------------------------------------------------------EXPORTS-------------------------------------------------------------------


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogsById = deleteBlogsById
module.exports.deleteBlogs = deleteBlogs

//-----------------------------------------------------------END-------------------------------------------------------------------