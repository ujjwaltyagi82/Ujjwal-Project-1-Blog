const AuthorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0){
          return res.status(400).send({status: false, msg: "Please enter details"})
        }
        let firstName= data.fname
        let lastName= data.lname
        let title= data.title
        let email= data.email
        let password= data.password
        if(!firstName){
          return res.status(400).send({status: false, msg: "Please provide First name"})
        }
        if(!lastName){
          return res.status(400).send({status: false, msg: "Please provide Last name"})
        }
        if(!title){
          return res.status(400).send({status: false, msg: "Please select Title"})
        }
        if(!email){
          return res.status(400).send({status: false, msg: "Please provide email"})
        }
        if(!password){
          return res.status(400).send({status: false, msg: "Please provide Password"})
        }
        const savedata = await AuthorModel.create(data)
        return res.status(201).send({ msg: "Author created", status: true, data: savedata })
    }
    catch (err) {
        return res.status(500).send({ msg: "Error", status: false, error: err.message })
    }
}


const loginUser = async function (req, res) {
    try {
      let userName = req.body.email;
      let password = req.body.password;
      if (!userName){
        res.status(400).send({ msg: "Please provide email" })
      }
      if (!password){
        res.status(400).send({ msg: "Please provide password" })
      }
      let author = await AuthorModel.findOne({ email: userName, password: password });
      if(!author){
          res.status(400).send({ msg: "Invalid username or password" })
        }
      let payload= {
        authorId: author._id.toString(),
        batch: "plutonium",
        organisation: "FUnctionUp",
      }
      let token = jwt.sign(payload, "projectgroup20-key");
      res.setHeader("x-api-key", token);
      return res.status(201).send({ msg:"login successfully", data: token });
    }
    catch (err) { 
      return res.status(500).send( {msg :"Error" , error : err.message }) 
    }
  };

module.exports.createAuthor = createAuthor
module.exports.loginUser = loginUser