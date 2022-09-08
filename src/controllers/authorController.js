const AuthorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if (!data){
          res.status(400).send({status: false, msg: "Please enter details"})
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