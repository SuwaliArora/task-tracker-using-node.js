const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
} , {timestamps: true});

const collection = new mongoose.model("user", loginSchema);

module.exports = collection;