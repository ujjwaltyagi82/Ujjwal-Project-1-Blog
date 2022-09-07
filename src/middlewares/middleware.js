const jwt = require ('jsonwebtoken')
const blogModel = require('../models/blogModel')

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-key"]
        if (!(token)) token = req.headers["x-api-key"]
        if (!(token)) return res.status(401).send({ status: false, msg: "Must enter token" })
        let decodedtoken = jwt.verify(token, "projectgroup20-key")
        
        if (!(decodedtoken)) return res.status(401).send({ status: false, msg: "Bad Request" })
        tokendecoded = decodedtoken.authorId
        console.log(tokendecoded)
     
        
        next()
    }
    catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }

}



const authorisation = async function (req, res, next) {
    try {
        let blogId = req.params.blogId
        authorsId = req.query.authorId
        if(authorsId){
            if (authorsId !==tokendecoded) { return res.status(403).send({ msg: "NOT AUTHENTICATED " }) }
            next()
        }
        else{ let data = await blogModel.findById(blogId)
        let authorid = data.authorId.toString()
        console.log(authorid)
        if (authorid !==tokendecoded) { return res.status(403).send({ msg: "NOT AUTHENTICATED " }) }
        next()}
    }
    catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.authentication= authentication
module.exports.authorisation= authorisation