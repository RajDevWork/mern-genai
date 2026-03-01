const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * @name registerUserController
 * @description Register a new user expects, username , email and password in req.body
 * @access Public
 */
async function registerUserController(req,res){
    const {username,email,password} = req.body

    //empty check
    if(username==='' || email==='' || password===''){
        return res.status(400).json({
            message:"Username,email or password are required"
        })
    }
    //check is already exists or not
    const isAlreadyExists = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isAlreadyExists){
        return res.status(400).json({
            message: `User already exists with ${isAlreadyExists.username==username? 'username '+ username: 'email '+email}`
        })
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password,10)

    //create user
    const user = await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    //create token
    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookie("token",token)

    const {password:_,...restUserDetails} = user.toObject() // convert mongoose object to plain JS object and excluding password from user details

    res.status(201).json({
        message:'User created successfully',
        user:restUserDetails
    })

}

/**
 * @name loginUserController
 * @description login a user expects username/email and password
 * @access Public
 */
async function loginUserController(req,res){

    const {email,password} = req.body

    if(email==='' || password===''){
        return res.status(400).json({
            message:'Email or Password is missing!'
        })
    }
    //check exists or not
    const isUserExists = await userModel.findOne({email}).select("+password") //aisa isliye kyunki model me humne password ke default selection ko false kiya hain.
    if(!isUserExists){
        return res.status(400).json({
            message:'Invalid email or password!'
        })
    }

    //check if password is valid or not

    const isValidpassword = await bcrypt.compare(password,isUserExists.password)
    if(!isValidpassword){
        return res.status(400).json({
            message:'Invalid email or password'
        })
    }

    // create token
    const token = jwt.sign({id:isUserExists._id,username:isUserExists.username},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie("token",token)

    const {password:_,...restUserDetails} = isUserExists.toObject() // convert mongoose object to plain JS object and excluding password from user details
    res.status(200).json({
        message:'User loggedin successfully',
        user:restUserDetails
    })

}

module.exports = {
    registerUserController,
    loginUserController
}