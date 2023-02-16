const mongoose=require("mongoose");


const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
    },
    nic:{
        type:String,
        required:true,
    },
    active:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


module.exports=mongoose.model("User",userSchema)