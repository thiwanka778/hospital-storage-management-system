const asyncHandler=require("express-async-handler")
const User=require("../models/userModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// desc get users
// route GET   /api/users/me

const getUsers=asyncHandler(async(req,res)=>{
   const {_id,username,userType,nic,active}=await User.findById(req.user.id)
   res.status(200).json({
    _id:_id,
    username:username,
    nic:nic,
    userType:userType,
    active:active,
   })
})
// desc create users (register user)
// route  POST   /api/users


const createUsers=asyncHandler(async(req,res)=>{
   const {username,password,userType,nic}=req.body

   if(!username || !password || !userType || !nic){
      return res.status(400).json({message:"All fields are required"})
   }

   const duplicate=await User.findOne({username}).lean().exec()
   if(duplicate){
    return res.status(409).json({message:"Duplicate username"})
   }

   const hashedPwd=await bcrypt.hash(password,10)
   const userObject={
    "username":username,
    "password":hashedPwd,
    "userType":userType,
    "nic":nic,
    
   }

   const user=await User.create(userObject)
   if(user){
    res.status(201).json({
        _id:user._id,
        username:user.username,
        userType:user.userType,
        nic:user.nic,
        active:user.active,
        token:generateToken(user._id),
    })
   }else{
    res.status(400).json({message:"Invalid user data received"})
   }

})

// desc update users
// route PUT   /api/users/:id

const updateUsers=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`update users ${req.params.id}`})
})

// desc delete users
// route DELETE   /api/users/:id

const deleteUsers=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`delete users ${req.params.id}`})
});


// desc  login users
// route POST  /api/users/login

const loginUsers=asyncHandler(async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:"username and password are required to login"})
     }
     
// check  username
     const user=await User.findOne({username}).lean().exec()
     
     // check password
if(user && (await bcrypt.compare(password,user.password))){
    res.json({
        _id:user._id,
        username:user.username,
        userType:user.userType,
        nic:user.nic,
        active:user.active,
        token:generateToken(user._id),
    })
}else{
    res.status(400)
    throw new Error("Invalid credentials")
}


});


// Generate JWT

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',

    })
}





module.exports={
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    loginUsers,
}