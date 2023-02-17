const express=require("express");
const router=express.Router();
const {createItems,getItems, updateItems,deleteItems}=require("../controllers/itemController")



router.post('/',createItems);
router.get("/",getItems)
router.put("/update",updateItems)
router.delete("/delete",deleteItems);






module.exports=router;