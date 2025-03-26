const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type:"string",
        required:true
    },
    email:{
        type:"string",
        required:true
    },
    password:{
        type:"string",
        required:true
    },
    token:{
        type:"string"
    }
},
{
    timestamps:true,    
}
);

const User = mongoose.model("User",UserSchema);
module.exports = User;