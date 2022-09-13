const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: 'First Name is required',
        trim: true
    },
    lname: {
        type: String,
        required: 'Last Name is required',
        trim: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: 'Title is required'
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: 'Email address is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    }

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)