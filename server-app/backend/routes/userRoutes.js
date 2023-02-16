const express=require("express");
const router=express.Router();
const {getUsers,createUsers,updateUsers,deleteUsers, loginUsers}=require("../controllers/userController")

const {protect}=require("../middleware/authMiddleware")

router.get('/me',getUsers);
router.post('/',createUsers);
router.put('/:id',updateUsers);
router.delete('/:id',deleteUsers);
router.post("/login",loginUsers)



module.exports=router;