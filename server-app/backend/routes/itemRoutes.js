const express=require("express");
const router=express.Router();
const {createItems,getItems}=require("../controllers/itemController")



router.post('/',createItems);
router.get("/",getItems)






module.exports=router;