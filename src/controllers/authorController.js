const AuthorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let data = req.body
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
      if ((!userName) || (!password)) res.status(400).send({ msg: "BAD REQUEST" })
      let author = await AuthorModel.findOne({ email: userName, password: password });
      if(!author){ res.status(400).send({ msg: "BAD REQUEST" }) }
      let token = jwt.sign(
        {
          authorId: author._id.toString(),
          batch: "plutonium",
          organisation: "FUnctionUp",
        },
        "projectgroup20-key"
      );
      res.setHeader("x-api-key", token);
      return res.status(201).send({ msg:"login is created", token: token });
    }
    catch (err) { 
      return res.status(500).send( {msg :"Error" , error : err.message }) 
    }
  };

module.exports.createAuthor = createAuthor
module.exports.loginUser = loginUser