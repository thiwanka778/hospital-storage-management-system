import React, { useState } from 'react';
import { TextField, TextareaAutosize, Button, Box, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {useDispatch,useSelector} from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';
import { createItem , getItem} from '../../features/itemSlice/itemSlice';


const ItemForm = () => {

  const dispatch=useDispatch();
  const loading=useSelector((state:any)=>state.item.loading);
  const itemChange=useSelector((state:any)=>state.item.itemChange);
  const typeArray=useSelector((state:any)=>state.type.typeArray);
  const [value, setValue] = React.useState<string | null>(null);
  const ta=typeArray.map((item:any)=>{
      return item.itemTypeName
  });
  const [itemType,setItemType]=React.useState<string>("");

  React.useEffect(()=>{
       dispatch(getItem())
  },[itemChange,dispatch]);
     
  React.useEffect(()=>{
    if(value!==null){
      setItemType((prevState:string)=>{
         for(let i=0;i<typeArray.length;i++){
          if(typeArray[i].itemTypeName===value){
            return typeArray[i]._id;
          }
         }  
      })
    }
  },[value])

  const [itemInformation, setItemInformation] = useState({
    itemName: '',
    description: '',
    quantity: '',
    supplierInformation: '',
    storageLocation: '',
    expirationDate: '',
    price:"",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setItemInformation((prevState:any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    
     dispatch(createItem({
         ...itemInformation,"itemType":itemType,
     }))

     console.log({...itemInformation,"itemType":itemType})
    // send data to server
  };


const formatDate = (date:any) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add a New Item
      </Typography>
      <div >
        <TextField
          id="itemName"
          name="itemName"
          label="Item Name"
          value={itemInformation.itemName}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />

<Autocomplete
      disablePortal
      id="combo-box-demo"
      options={ta}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      value={value}
      fullWidth
      renderInput={(params) => <TextField   margin="normal" required {...params} label="Type of the Item" />}
    />

       


         <TextField
         id="description"
         name="description"
         label="Description"
         value={itemInformation.description}
         onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />

<TextField
          id="price"
          name="price"
          type="number"
          label="Price per one item"
          value={itemInformation.price}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          value={itemInformation.quantity}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />

        <TextField
          id="supplierInformation"
          name="supplierInformation"
          label="Supplier Information"
          value={itemInformation.supplierInformation}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          required
        />

        <TextField
          id="storageLocation"
          name="storageLocation"
          label="Storage Location"
          value={itemInformation.storageLocation}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
        fullWidth
        />

<TextField
style={{marginTop:"20px"}}
        id="expirationDate"
        name="expirationDate"
        label="Expiration Date"
        type="date"
        value={itemInformation.expirationDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {itemInformation.expirationDate
                ? formatDate(itemInformation.expirationDate)
                : 'dd/mm/yyyy'}
            </InputAdornment>
          ),
        }}
      />
      <br/>

       {loading===false &&  <Button variant="contained" onClick={handleSubmit} color="primary" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>}
        {loading===true &&  <Button variant="contained" disabled  color="primary" type="submit" sx={{ mt: 2 }}>
          Submit
        </Button>}


      </div>
    </Box>
  );
};

export default ItemForm;
