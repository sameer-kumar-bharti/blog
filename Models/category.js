const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:"string",
        required:true
    },
    url_key:{
        type:"string",
        required:true
    },
    meta_title:{
        type:"string",
        required:true
    },
    meta_description:{
        type:"string",
        required:true
    }
},{ timestamps:true });

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;