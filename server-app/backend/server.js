const express =require("express");
const dotenv=require("dotenv").config();
const mongoose=require("mongoose");
const {errorHandler}=require("./middleware/errorMiddleware");
const connectDB=require("./config/db")
const port=process.env.PORT || 5000
const cors=require("cors");
mongoose.set('strictQuery', false);
connectDB()


const app=express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/types",require("./routes/typeRoutes"))
app.use("/api/items",require("./routes/itemRoutes"))

app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})