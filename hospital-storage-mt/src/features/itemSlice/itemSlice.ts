import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const litemArray=window.localStorage.getItem("itemArray")
const initialState={
   loading:false,
   errorMessage:"",
   itemChange:1,
   itemArray:litemArray?JSON.parse(litemArray):[],
   openu:false,
   itemId:"",
   updateLoading:false,
   opend:false,


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

  export const updateItem:any = createAsyncThunk(
    'item/update',
    async (option:any,thunkAPI) => {
      try{
        const response = await axios.put("http://localhost:8000/api/items/update",option);
        return response.data;
      }catch(error:any){
        const errorMessage=(error.response && error.response.data && 
          error.response.data.message)|| error.message || error.toString()
          return thunkAPI.rejectWithValue(errorMessage);
      }
      
    }
  );

  export const deleteItems:any = createAsyncThunk(
    'item/delete',
    async (id,thunkAPI) => {
      try{
       
       const resp:any= await axios.delete("http://localhost:8000/api/items/delete",{
        data:{id},
       });
        return resp.data;
      }catch(error:any){
          
      }
      
    }
  );

 const itemSlice:any=createSlice({
    name:"item",
    initialState,
    reducers:{
           updateDialogClose:(state:any)=>{
            state.openu=false;
           },
           getItemId:(state:any,action:any)=>{
                state.openu=true;
                state.itemId=action.payload.required
           },
           changing:(state:any)=>{
            state.itemChange=state.itemChange+1;
           },
           getDeletedItemId:(state:any,action:any)=>{
            state.itemId=action.payload.required;
            state.opend=true;
           },
           deleteBoxClose:(state:any)=>{
            state.opend=false;
           }

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



          .addCase(updateItem.pending, (state:any) => {
            
            state.errorMessage="";
            state.updateLoading=true;
          })
          .addCase(updateItem.fulfilled, (state:any, action:any) => {
              state.errorMessage="";
              state.itemChange=state.itemChange+1;
              state.updateLoading=false;
              state.openu=false;
              
          })
          .addCase(updateItem.rejected, (state:any, action:any) => {
              state.loading = false;
              state.updateLoading=false;
              state.errorMessage=action.payload;
              
          })


          .addCase(deleteItems.pending, (state:any) => {
           
            
          })
          .addCase(deleteItems.fulfilled, (state:any, action:any) => {
              state.itemChange=state.itemChange+1;
              state.opend=false;
              
          })
          .addCase(deleteItems.rejected, (state:any, action:any) => {
              
          })
    }
    
 })
export const {updateDialogClose,getItemId,changing,getDeletedItemId, deleteBoxClose}=itemSlice.actions;
 export default itemSlice.reducer;