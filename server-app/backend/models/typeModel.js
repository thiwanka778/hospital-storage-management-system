const mongoose=require("mongoose");


const itemTypeSchema= mongoose.Schema({
   itemTypeName:{
     type:String,
     required:true,
   }
},{
    timestamps:true
})


module.exports=mongoose.model("Itemtype",itemTypeSchema)