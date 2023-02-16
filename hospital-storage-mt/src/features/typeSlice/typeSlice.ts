import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const lta=window.localStorage.getItem("typeArray");
const ltemp=window.localStorage.getItem("temp");

const initialState={
   loading:false,
   errorMessage:"",
   typeArray:lta?JSON.parse(lta):[],
   isChange:1,
   typeId:"",
   opentu:false,
   temp:ltemp?JSON.parse(ltemp):"",
}

export const deleteType:any = createAsyncThunk(
  'type/delete',
  async (id,thunkAPI) => {
    try{
     
     const resp:any= await axios.delete("http://localhost:8000/api/types/delete",{
      data:{id},
     });
      return resp.data;
    }catch(error:any){
        
    }
    
  }
);
export const updateType:any = createAsyncThunk(
    'type/update',
    async (option:any,thunkAPI) => {
      try{
        const response = await axios.put("http://localhost:8000/api/types/update",option);
        return response.data;
      }catch(error:any){
          
      }
      
    }
  );

export const getType:any = createAsyncThunk(
    'type/get',
    async () => {
      try{
        const response = await axios("http://localhost:8000/api/types");
        return response.data;
      }catch(error:any){
          
      }
      
    }
  );

export const createType:any = createAsyncThunk(
    'type/create',
    async (option:any,thunkAPI) => {
      try{
        const response = await axios.post("http://localhost:8000/api/types",option);
        return response.data;
      }catch(error:any){
           const errorMessage=(error.response && error.response.data && 
            error.response.data.message)|| error.message || error.toString()
            return thunkAPI.rejectWithValue(errorMessage)
      }
      
    }
  );

const typeSlice:any = createSlice({
    name:"type",
    initialState,
    reducers:{
          somethingChange:(state:any)=>{
              state.isChange=state.isChange+1;
          },
          getTypeId:(state:any,action:any)=>{
            state.typeId=action.payload.required;
            state.opentu=true;
          },
          typeUpdateDialogClose:(state:any)=>{
            state.opentu=false;
          },
          tempStore:(state:any,action:any)=>{
                state.temp=action.payload;
                window.localStorage.setItem("temp",JSON.stringify(state.temp))
          }
    },
    extraReducers:(builder:any)=>{
        builder
        .addCase(createType.pending, (state:any) => {
          state.loading = true;
          state.errorMessage="";
        })
        .addCase(createType.fulfilled, (state:any, action:any) => {
            state.loading = false;
            state.errorMessage="";
            state.isChange=state.isChange+1;
            
        })
        .addCase(createType.rejected, (state:any, action:any) => {
            state.loading = false;
            state.errorMessage=action.payload;
          
        })
         
        .addCase(getType.pending, (state:any) => {
            state.loading = true;
            state.errorMessage="";
          })
          .addCase(getType.fulfilled, (state:any, action:any) => {
              state.loading = false;
              state.errorMessage="";
              state.typeArray=action.payload;
              window.localStorage.setItem("typeArray",JSON.stringify(state.typeArray))
              
          })
          .addCase(getType.rejected, (state:any, action:any) => {
              state.loading = false;
              
          })

          .addCase(updateType.pending, (state:any) => {
            state.loading = true;
            state.errorMessage="";
          })
          .addCase(updateType.fulfilled, (state:any, action:any) => {
              state.loading = false;
              state.errorMessage="";
              state.isChange=state.isChange+1;
              
          })
          .addCase(updateType.rejected, (state:any, action:any) => {
              state.loading = false;
              
          })

          .addCase(deleteType.pending, (state:any) => {
            state.loading = true;
            state.errorMessage="";
          })
          .addCase(deleteType.fulfilled, (state:any, action:any) => {
              state.loading = false;
              state.errorMessage="";
              state.isChange=state.isChange+1;
              
          })
          .addCase(deleteType.rejected, (state:any, action:any) => {
              state.loading = false;
              
          })

      },
  })

export const {somethingChange,getTypeId,typeUpdateDialogClose, tempStore}=typeSlice.actions;
  export default typeSlice.reducer;
