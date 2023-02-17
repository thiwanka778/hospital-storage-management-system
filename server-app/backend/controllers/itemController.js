const asyncHandler=require("express-async-handler")
const Item=require("../models/itemModel")


// desc create items
// route  post    /api/items

const createItems=asyncHandler(async(req,res)=>{
    const {itemName,itemType,price,quantity,storageLocation,description,supplierInformation,expirationDate}=req.body;
    if(!itemName || !itemType || !price || !quantity || !supplierInformation ){
        res.status(400).json({message:"Required fields must be filled"})
    }

    const duplicate=await Item.findOne({itemName}).lean().exec()
    if(duplicate){
        return res.status(409).json({message:"Duplicate Item Name"})
    }
    
    const itemObject={
        itemName,
        itemType,
        price,
        quantity,
        storageLocation,
        description,
        supplierInformation,
        expirationDate,
    }
    const item=await Item.create(itemObject)
    if(item){
        res.status(201).json({
            item
        })
    }else{
        res.status(400).json({message:"Invalid Item data received"})
    }

});

// desc  get types
// route  GET   /api/items/

const getItems=asyncHandler(async(req,res)=>{
    const data=await Item.find().lean();
    
     res.status(200).json(data);
        
 });

 // desc  get types
// route  PUT   /api/items/update

const updateItems=asyncHandler(async(req,res)=>{
    const {id,itemName,itemType,quantity,price,storageLocation,supplierInformation,expirationDate,description}=req.body;

    if(!id || !itemName || !itemType || !quantity || !price || !supplierInformation){
        return res.status(400).json({message:"Item Name, Item Type, Price, Quantity and Supplier Information are required"})
    }
    const item=await Item.findById(id).exec()

    if(!item){
        return res.status(400).json({message:"Item not Found"})
    }

    const duplicate=await Item.findOne({itemName})
    if(duplicate && duplicate?._id.toString()!==id){
        return res.status(409).json({message:"Duplicate Item Name"})
    }

    item.itemName=itemName
    item.itemType=itemType
    item.quantity=quantity
    item.price=price
    item.supplierInformation=supplierInformation
    item.expirationDate=expirationDate
    item.description=description
    item.storageLocation=storageLocation

    const updatedItem=await item.save()

    res.json({
        message:"Updated successfully"
    })

        
 });


  // desc  delete types
// route  DELETE   /api/items/delete

const deleteItems=asyncHandler(async(req,res)=>{
    const {id}=req.body
    if(!id){
     return res.status(400).json({message:"Item ID required"})
    }
 
    const item= await Item.findById(id).exec()
    if(!item){
     return res.status(400).json({message:"item not found"})
    }
 
    const result = await item.deleteOne()   
    res.status(200).json({message:"Item deleted"})  
      
  })








module.exports={
   createItems,
   getItems,
   updateItems,
   deleteItems,
}

