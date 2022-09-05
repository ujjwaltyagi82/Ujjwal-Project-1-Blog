const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId:{
        type: objectId,
        ref: "Author",
        required:true,
    },
    tags: { type:[String] 
    },
    category: {
        type: String,
        required: true,
    },
    subcatagory: { type: [String]},
    isDeleted: {
        type : Boolean,
        default: false
    },
    isPublished:{type:Boolean, default: false},
    publishedAt: String
    

    

    
} , {timestamps:true});

module.exports= mongoose.model('Blog', blogSchema)