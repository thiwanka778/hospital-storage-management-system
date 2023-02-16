const express=require("express");
const router=express.Router();
const {createTypes,getTypes,updateTypes,deleteTypes}=require("../controllers/typeController")




router.post('/',createTypes);
router.get('/',getTypes);
router.put('/update',updateTypes);
router.delete('/delete',deleteTypes)




module.exports=router;