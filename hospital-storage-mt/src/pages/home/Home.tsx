import React from 'react';
import "./homeStyles.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginUser,snackClose } from '../../features/loginSlice/loginSlice';
import {useDispatch} from "react-redux";
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
  const dispatch=useDispatch();
  const errorMessage=useSelector((state:any)=>state.login.errorMessage);
const openSnack=useSelector((state:any)=>state.login.openSnack)
const loading=useSelector((state:any)=>state.login.loading)
const username=useSelector((state:any)=>state.login.username)
    const [formData,setFormData]=React.useState<any>({username:"",password:""});
    const formChange=(event:any)=>{
        const {name,value}=event.target;
        setFormData((prevState:any)=>{
           return {
            ...prevState,[name]:value
           }
        })
    };
    
    const loginClick=()=>{
      if(formData.username!=="" && formData.password!==""){
        dispatch(loginUser(formData));
      }  
    };
    const handleClose = () => {
      dispatch(snackClose())
    };

  return (
    <>
    <div className='home'>
   
   
   {username==="" &&   <div className='login'>
   <p style={{margin:"10px",fontFamily: "'Poppins', sans-serif" ,color:"red"}}>{errorMessage}</p>
     <TextField id="outlined-basic" onChange={formChange} name="username" value={formData.username}
     sx={{width:"300px",margin:"10px"}} label="Username" size="small" variant="outlined" />
     <TextField id="outlined-basic" onChange={formChange} name="password" value={formData.password} sx={{width:"300px",margin:"10px"}} label="Password" type="password" size="small" variant="outlined" />
   {loading===false &&   <Button variant="contained" sx={{width:"300px",margin:"10px"}} onClick={loginClick}  color="success" size="small">Login</Button>}
     {loading===true && <Button variant="contained" disabled sx={{width:"300px",margin:"10px"}}  color="success" size="small">Login</Button>}
     </div>}

    </div>





<div>
<Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Logged in Successfully !
        </Alert>
      </Snackbar>
</div>
    </>
  )
}

export default Home