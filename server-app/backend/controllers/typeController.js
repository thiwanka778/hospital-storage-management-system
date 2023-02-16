const asyncHandler=require("express-async-handler")
const ItemType=require("../models/typeModel")

// desc   create types
// route PUT   /api/types

const createTypes=asyncHandler(async(req,res)=>{
    const {itemTypeName}=req.body;
    if(!itemTypeName){
        return res.status(400).json({message:"The fiels can't be empty"})
    }

    const duplicate=await ItemType.findOne({itemTypeName}).lean().exec()
    if(duplicate){
        return res.status(409).json({message:"Duplicate type"})
    }

    const typeObject={
        "itemTypeName":itemTypeName
    }
    const itemtype=await ItemType.create(typeObject)
    if(itemtype){
        res.status(201).json({
            _id:itemtype._id,
            itemTypeName:itemtype.itemTypeName,
        })
    }else{
        res.status(400).json({message:"Invalid item types data"})
    }
});

// desc  get types
// route  GET   /api/types/

const getTypes=asyncHandler(async(req,res)=>{
   const data=await ItemType.find().lean();
   
    res.status(200).json(data);
       
})

// desc  get types
// route PUT   /api/types/update

const updateTypes=asyncHandler(async(req,res)=>{
   const {id,itemTypeName}=req.body;
   if(!id || !itemTypeName){
    return res.status(400).json({message:"required"})
   }

   const itemtypes=await ItemType.findById(id).exec()
    if(!itemtypes){
        return res.status(400).json({message:"Item type not found"})
    }

    const duplicate=await ItemType.findOne({itemTypeName})
    if(duplicate && duplicate?._id.toString()!==id){
        return res.status(409).json({message:"Duplicate item type name"})
    }

    itemtypes.itemTypeName=itemTypeName;

    const updatedItem= await itemtypes.save()
    res.json({message:`updated item type`})
     
 })

 // desc  delete types
// route  DELETE   /api/types/delete

const deleteTypes=asyncHandler(async(req,res)=>{
   const {id}=req.body
   if(!id){
    return res.status(400).json({message:"Type ID required"})
   }

   const itemtypes= await ItemType.findById(id).exec()
   if(!itemtypes){
    return res.status(400).json({message:"item not found"})
   }

   const result = await itemtypes.deleteOne()   
   res.status(200).json({message:"type deleted"})  
     
 })







module.exports={
    createTypes,
    getTypes,
    updateTypes,
    deleteTypes,
}