const mongoose=require("mongoose");

const itemSchema= mongoose.Schema({

    itemName: { type: String, required: true },
  itemType: { type: String, required: true },
  description: { type: String, required: false },
  quantity: { type: Number, required: true },
  supplierInformation: { type: String, required: true },
  storageLocation: { type: String, required: false },
  expirationDate: { type: Date, required: false },
  price:{
    type:Number,
    required:true
  }
 },{
     timestamps:true
 })
 
 
 module.exports=mongoose.model("Item",itemSchema)