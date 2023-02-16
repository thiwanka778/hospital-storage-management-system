import React from 'react';
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import "./styles.css";
import {Routes,Route} from "react-router-dom";
import Inventory from './pages/inventory/Inventory';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import Category from './pages/category/Category';
import {useDispatch,useSelector} from "react-redux";
import {getType} from "./features/typeSlice/typeSlice"
import RequiredAuth from './components/RequiredAuth';
import {getItem} from "./features/itemSlice/itemSlice";


function App() {
const dispatch=useDispatch();
const isChange=useSelector((state:any)=>state.type.isChange)
const itemChange=useSelector((state:any)=>state.item.itemChange)
  React.useEffect(()=>{
    dispatch(getType())
},[dispatch,isChange]);


React.useEffect(()=>{
  dispatch(getItem())
},[itemChange,dispatch]);
  return (

    <div>
 <Nav/>

 <Routes>


<Route path="/" element={<Home/>} />
<Route path="reports" element={<Reports/>}/>
<Route path="/settings" element={<Settings/>}/>
<Route path="/category" element={<Category/>}/>



<Route element={<RequiredAuth/>}>
<Route path="inventory"  element={<Inventory/>}/>
</Route>




 </Routes>

    </div>
  );
}

export default App;
