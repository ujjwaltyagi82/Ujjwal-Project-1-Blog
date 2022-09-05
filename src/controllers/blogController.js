const BlogModel= require('../models/blogModel')

const createBlog= async function(req, res){
    try{
        let data= req.body
        if(!(data)) res.status(400).send({status:false, msg:"Bad Request"})
        let id = data.authorId
        let findid = await AuthorModel.findById(id)
        if(!(findid)) res.status(404).send({status:false, msg:"Invalid authorId. Author Not Found "})
        // if(typeof(data.authorId) !== ObjectId){
        //     return res.status(404).send({status: false, msg: "Invalid authorId. Author Not Found"})
        // } else {
            let savedData= await BlogModel.create(data)
            return res.status(201).send({status: true, msg: savedData})
        }
    catch(err){
        console.log("The error is ==>", err)
        res.status(500).send({status: false, error: err.message})
    }
}

const getBlogs = async function(req, res){
    try{
        let data = req.query // yahaper n agar humne kuch nhi diya query main to wo empty object lega jiski truthy falsy value true hoti hain isliye wo direct requireblogs main ja raha 
        if(Object.keys (data).lenght !==0) // magar hume all blogs chahiye isliye humne pahile object.keys se data ko array main convert kiya jisase hum uski lenght check kr rhe hain agar uski lenght 0 hogi to wo getblogs main jayega 
        {
            const requireblogs = await BlogModel.find(data).populate('Author')
            res.status(200).send({msg:"Require Blogs", status: true, data: requireblogs})
        }
        let getblogs = await BlogModel.find().populate('Author')
        res.status(200).send({msg:"All Blogs", status: true, data: getblogs})
    }
    catch(err){
        console.log("The error is ==>", err)
        res.status(500).send({status: false, error: err.message})
    }
}

module.exports.createBlog= createBlog
module.exports.getBlogs= getBlogs