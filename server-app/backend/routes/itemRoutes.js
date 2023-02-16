const express=require("express");
const router=express.Router();
const {createItems,getItems, updateItems}=require("../controllers/itemController")



router.post('/',createItems);
router.get("/",getItems)
router.put("/update",updateItems)






module.exports=router;