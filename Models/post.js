const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user_id:{
        type:"string",
        required:true
    },
    category_id:{
        type:"string",
        required:true
    },
    title:{
        type:"string",
        required:true
    },
    url_key:{
        type:"string",
        required:true
    },
    image:{
        type:"string",
        required:true
    },
    featured_image:{
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
    },
    content:{
        type:"string",
        required:true
    }
},{ timestamps:true });

const Post = mongoose.model('Post',postSchema);
module.exports = Post;