import React from 'react';
import {getTypeId, somethingChange} from "../../features/typeSlice/typeSlice";
import {useDispatch,useSelector} from "react-redux";

interface itemProps{
    item:any,
    deleteClick:Function|any,
    id:string,
}
function ItemType(props:itemProps) {
    const dispatch=useDispatch();
    const opentu=useSelector((state:any)=>state.type.opentu);
 
    const updateClick=()=>{
        dispatch(getTypeId({required:props.item._id}))
        dispatch(somethingChange())
    }

  

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      padding: '1rem',
      margin: '1rem 0',
      marginLeft:"20px",
    }}>
      <p style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginRight: 'auto',
        fontFamily: "'Poppins', sans-serif",
      }}>{props.item.itemTypeName}</p>
      <button style={{
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '0.5rem 1rem',
        marginRight: '0.5rem',
        cursor:"pointer",
        
      }} onClick={updateClick} >Update</button>
      
      <button style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '0.5rem 1rem',
        cursor:"pointer",
      }} onClick={()=>props.deleteClick(props.id)} >Delete</button>
    </div>
  );
}

export default ItemType;
