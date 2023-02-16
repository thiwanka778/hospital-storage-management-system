import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState={
loading:false,
errorMessage:"",
opense:false,
openss:false,

}

export const signupUser:any = createAsyncThunk(
    'user/signup',
    async (option:any,thunkAPI) => {
      try{
        const response = await axios.post("http://localhost:8000/api/users",option);
        return response.data;
      }catch(error:any){
           const errorMessage=(error.response && error.response.data && 
            error.response.data.message)|| error.message || error.toString()
            return thunkAPI.rejectWithValue(errorMessage)
      }
      
    }
  );


  const signupSlice:any = createSlice({
    name:"signup",
    initialState,
    reducers:{
            handleClosese:(state:any)=>{
                state.opense=false;
            },
            handleClosess:(state:any)=>{
                state.openss=false;
            }
    },
    extraReducers:(builder:any)=>{
        builder
        .addCase(signupUser.pending, (state:any) => {
          state.loading = true;
          state.errorMessage="";
        })
        .addCase(signupUser.fulfilled, (state:any, action:any) => {
            state.loading = false;
            state.errorMessage="";
            state.openss=true;
        })
        .addCase(signupUser.rejected, (state:any, action:any) => {
            state.loading = false;
            state.errorMessage=action.payload;
            state.opense=true;
          
        });
      },
  })

export const {handleClosese,handleClosess}=signupSlice.actions;
  export default signupSlice.reducer;


