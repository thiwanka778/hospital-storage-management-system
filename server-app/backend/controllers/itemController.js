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







module.exports={
   createItems,
   getItems,
}

