const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Email already taken"],
        required:true
    },
    password:{
        type:String,
        required:true,
        select: false // bi-default select preventing
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel