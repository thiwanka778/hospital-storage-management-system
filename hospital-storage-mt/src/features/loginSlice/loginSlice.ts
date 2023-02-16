import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const lid=localStorage.getItem("id");
const lu=localStorage.getItem("username");
const lut=localStorage.getItem("userType");
const lnic=localStorage.getItem("nic");
const ltoken=localStorage.getItem("token");
const lactive=localStorage.getItem("active");

const initialState={
  username:lu?JSON.parse(lu):"",
  userType:lut?JSON.parse(lut):"user",
  active:lactive?JSON.parse(lactive):true,
  nic:lnic?JSON.parse(lnic):"",
  loading:false,
  errorMessage:"",
  id:lid?JSON.parse(lid):"",
  token:ltoken?JSON.parse(ltoken):"",
  openSnack:false,
}

export const loginUser:any = createAsyncThunk(
  'user/login',
  async (option:any,thunkAPI) => {
    try{
      const response = await axios.post("http://localhost:8000/api/users/login",option);
      return response.data;
    }catch(error:any){
         const errorMessage=(error.response && error.response.data && 
          error.response.data.message)|| error.message || error.toString()
          return thunkAPI.rejectWithValue(errorMessage)
    }
    
  }
);
const loginSlice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
      logoutClick:(state:any)=>{
        state.username="";
      state.userType="";
      state.nic="";
      state.active=false;
      state.id="";
      state.token="";
      window.localStorage.setItem("id",JSON.stringify(state.id))
      window.localStorage.setItem("username",JSON.stringify(state.username))
      window.localStorage.setItem("userType",JSON.stringify(state.userType))
      window.localStorage.setItem("nic",JSON.stringify(state.nic))
      window.localStorage.setItem("active",JSON.stringify(state.active))
      window.localStorage.setItem("token",JSON.stringify(state.token))
      },
      snackClose:(state:any)=>{
        state.openSnack=false;
      },
      reset:(state:any)=>{
         state.loading=false;
         state.errorMessage="";
      },
  },
  extraReducers:(builder:any)=>{
    builder
    .addCase(loginUser.pending, (state:any) => {
      state.loading = true;
      state.errorMessage="";
    })
    .addCase(loginUser.fulfilled, (state:any, action:any) => {
      state.loading = false;
      state.username=action.payload.username;
      state.userType=action.payload.userType;
      state.nic=action.payload.nic;
      state.active=action.payload.active;
      state.id=action.payload._id;
      state.token=action.payload.token;
      window.localStorage.setItem("id",JSON.stringify(state.id))
      window.localStorage.setItem("username",JSON.stringify(state.username))
      window.localStorage.setItem("userType",JSON.stringify(state.userType))
      window.localStorage.setItem("nic",JSON.stringify(state.nic))
      window.localStorage.setItem("active",JSON.stringify(state.active))
      window.localStorage.setItem("token",JSON.stringify(state.token))
      state.openSnack=true;
      state.errorMessage="";
    })
    .addCase(loginUser.rejected, (state:any, action:any) => {
      state.loading = false;
      state.errorMessage=action.payload;
      
    });
  },
});

export const {logoutClick,snackClose}=loginSlice.actions;
export default loginSlice.reducer;