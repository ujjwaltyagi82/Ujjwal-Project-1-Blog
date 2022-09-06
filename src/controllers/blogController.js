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
        return res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
}

const getBlogs = async function (req, res) {
    try {
        let data = req.query // yahaper n agar humne kuch nhi diya query main to wo empty object lega jiski truthy falsy value true hoti hain isliye wo direct requireblogs main ja raha 
        console.log(data)
        if (Object.keys(data).lenght !== 0) 
        {
            console.log(data)
            let particularblogs = await BlogModel.find(data).populate('authorId')
            console.log(particularblogs)
            return  res.status(200).send({ msg: "Require Blogs", status: true, data: particularblogs })
            
        }
        let getblogs = await BlogModel.find().populate('authorId')
        return res.status(200).send({ msg: "All Blogs", status: true, data: getblogs })
    }
    catch (err) {
        console.log("The error is ==>", err)
        return res.status(500).send({ status: false, error: err.message })
    }
} 

module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs

// magar hume all blogs chahiye isliye humne pahile object.keys se data ko array main convert kiya jisase hum uski lenght check kr rhe hain agar uski lenght 0 hogi to wo getblogs main jayega 