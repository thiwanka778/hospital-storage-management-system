import React from 'react';
import {Navigate,Outlet,useLocation} from "react-router-dom";
import { useSelector } from 'react-redux';

const RequiredAuth = () => {
    const username=useSelector((state:any)=>state.login.username)
  const location=useLocation();
  return (
     username!=="" 
     ?<Outlet/>
     :<Navigate to="/" state={{from:location}} replace />
  );
}

export default RequiredAuth;



