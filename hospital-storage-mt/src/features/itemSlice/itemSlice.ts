import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const litemArray=window.localStorage.getItem("itemArray")
const initialState={
   loading:false,
   errorMessage:"",
   itemChange:1,
   itemArray:litemArray?JSON.parse(litemArray):[],

 }

 export const getItem:any = createAsyncThunk(
    'item/get',
    async () => {
      try{
        const response = await axios("http://localhost:8000/api/items");
        return response.data;
      }catch(error:any){
           
      }
      
    }
  );

 export const createItem:any = createAsyncThunk(
    'item/create',
    async (option:any,thunkAPI) => {
      try{
        const response = await axios.post("http://localhost:8000/api/items",option);
        return response.data;
      }catch(error:any){
           const errorMessage=(error.response && error.response.data && 
            error.response.data.message)|| error.message || error.toString()
            return thunkAPI.rejectWithValue(errorMessage);
      }
      
    }
  );

 const itemSlice:any=createSlice({
    name:"item",
    initialState,
    reducers:{

    },
    extraReducers:(builder:any)=>{
        builder
        .addCase(createItem.pending, (state:any) => {
            state.loading = true;
            state.errorMessage="";
          })
          .addCase(createItem.fulfilled, (state:any, action:any) => {
              state.loading = false;
              state.errorMessage="";
             state.itemChange=state.itemChange+1;
              
          })
          .addCase(createItem.rejected, (state:any, action:any) => {
              state.loading = false;
              state.errorMessage=action.payload;
              console.log(action.payload)
            
          })

          .addCase(getItem.pending, (state:any) => {
            state.loading = true;
            state.errorMessage="";
          })
          .addCase(getItem.fulfilled, (state:any, action:any) => {
              state.loading = false;
              state.errorMessage="";
              state.itemArray=action.payload;
              window.localStorage.setItem("itemArray",JSON.stringify(state.itemArray))
              
          })
          .addCase(getItem.rejected, (state:any, action:any) => {
              state.loading = false;
              
          })
    }
    
 })

 export default itemSlice.reducer;