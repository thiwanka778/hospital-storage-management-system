import React,{useState} from 'react'
import "./navStyles.css";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useSelector,useDispatch } from 'react-redux';
import { logoutClick } from '../../features/loginSlice/loginSlice';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {NavLink} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { TextField, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { signupUser } from '../../features/signupSlice/signupSlice';
import Snackbar from '@mui/material/Snackbar';
import { handleClosese,handleClosess } from '../../features/signupSlice/signupSlice';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Nav = () => {
  const dispatch=useDispatch();
  const opense=useSelector((state:any)=>state.signup.opense);
  const openss=useSelector((state:any)=>state.signup.openss);
  const username=useSelector((state:any)=>state.login.username)
  const userType=useSelector((state:any)=>state.login.userType)
  const [open, setOpen] = React.useState(false);
  const [usernames, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nic, setNic] = useState('');
  const [userTypes, setUserType] = useState<string |null>(null);
  const errorMessage=useSelector((state:any)=>state.signup.errorMessage);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signupClick=()=>{
    setOpen(false);
    dispatch(signupUser({
      username:usernames,
      password:password,
      nic:nic,
      userType:userTypes,
    }))
    setUsername("");
    setUserType(null);
    setPassword("");
    setConfirmPassword("");
    setNic("");
  };
  const handleCloseSnack=()=>{
    dispatch(handleClosese())
  };

  const handleCloseSuccess = () => {
    dispatch(handleClosess())
  };
  return (
    <>
    <div className='nav'>
        <img className='image' src="https://cdn-icons-png.flaticon.com/512/33/33777.png" alt=""/>
        <p className='title'>HMS</p>
        <NavLink to="/" className='a'>Home</NavLink>
        <NavLink to="/inventory" className='a'>Inventory</NavLink>
        <NavLink to="/reports" className='a'>Reports</NavLink>
        <NavLink to="/settings" className='a'>Settings</NavLink>
        <NavLink to="/category" className='a'>Category</NavLink>
       {username!=="" &&  <div className='a'>
       <Tooltip title="Logout">
      <IconButton onClick={()=>dispatch(logoutClick())}>
        <PowerSettingsNewIcon   fontSize="small" />
      </IconButton>
    </Tooltip>
          
        </div>}

      {username!=="" && userType==="admin" &&  <div  className='a'>
        <Tooltip title="Create new user">
      <IconButton onClick={handleClickOpen}>
        <PersonIcon  fontSize="small"/>
      </IconButton>
    </Tooltip>
        </div>}
        </div>


        <div>
        <Dialog
        open={open}
        onClose={handleClose}
       
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a New User"}
        </DialogTitle>
        <DialogContent>
          <div>
           {confirmPassword!=="" && confirmPassword!==password &&  <p style={{color:"red",fontFamily: "'Poppins', sans-serif"  }}>passwords do not match !</p>}
          <TextField
        label="Username"
        value={usernames}
        onChange={(e:any) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e:any) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e:any) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="NIC"
        value={nic}
        onChange={(e:any) => setNic(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Autocomplete
      disablePortal
      value={userTypes}
      id="combo-box-demo"
      options={["admin","user"]}
      onChange={(event: any, newValue: string | null) => {
        setUserType(newValue);
      }}
      fullWidth
      renderInput={(params) => <TextField
       
        margin="normal" variant="filled" {...params} label="User Type" />}
    />
    
            </div>
        </DialogContent>
        <DialogActions>
         {usernames!=="" && password!=="" && userTypes!==null && confirmPassword!=="" && nic!=="" && confirmPassword===password && <Button size="small"  onClick={signupClick} variant="contained">sign up</Button>}
         {(usernames==="" || password==="" || userTypes==null || confirmPassword==="" || nic==="" || confirmPassword!==password )&&  <Button size="small" disabled variant="contained">sign up</Button>}
          <Button size="small" variant="contained" color="error" 
          onClick={handleClose} >
            cancel
          </Button>
        </DialogActions>
      </Dialog>
        </div>

        <div>
        <Snackbar open={opense} autoHideDuration={5000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
        </div>


        <div>
        <Snackbar open={openss} autoHideDuration={5000} onClose={ handleCloseSuccess }>
        <Alert onClose={ handleCloseSuccess } severity="success" sx={{ width: '100%' }}>
          Registered Successfully !
        </Alert>
      </Snackbar>
        </div>

        </>
  )
}

export default Nav