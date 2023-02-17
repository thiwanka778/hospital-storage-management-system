import React from 'react'
import "./inventoryStyles.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import { createType,deleteType,getType ,somethingChange,
  typeUpdateDialogClose,updateType,tempStore} from '../../features/typeSlice/typeSlice';
import ItemType from './ItemType';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ItemForm from './ItemForm';
import ItemCard from './ItemCard';
import { updateDialogClose,changing, deleteItems } from '../../features/itemSlice/itemSlice';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { getItem ,updateItem, deleteBoxClose} from '../../features/itemSlice/itemSlice';






const Inventory = () => {
  const dispatch=useDispatch();
  const temp=useSelector((state:any)=>state.type.temp);
  const opentu=useSelector((state:any)=>state.type.opentu);
  const typeId=useSelector((state:any)=>state.type.typeId);
  const isChange=useSelector((state:any)=>state.type.isChange);
  const itemChange=useSelector((state:any)=>state.item.itemChange);
  const typeArray=useSelector((state:any)=>state.type.typeArray);
  const itemArray=useSelector((state:any)=>state.item.itemArray);
  const opend=useSelector((state:any)=>state.item.opend);
  const loading:any=useSelector((state:any)=>state.type.loading);
  const [value, setValue] = React.useState('1');
const [itemType,setItemType]=React.useState<string>("");
const [itemTypeUpdated,setItemTypeUpdated]=React.useState<string>("");
const errorMessage=useSelector((state:any)=>state.item.errorMessage);
const openu=useSelector((state:any)=>state.item.openu);
const itemId=useSelector((state:any)=>state.item.itemId);
const [valuet, setValuet] = React.useState<string | null>(null);
const updateLoading=useSelector((state:any)=>state.item.updateLoading);
const [valuetype, setValuetype] = React.useState<string | null>(null);
const [itemInformation, setItemInformation] = React.useState<any>({
  itemName: '',
  description: '',
  quantity: '',
  supplierInformation: '',
  storageLocation: '',
  expirationDate: '',
  price:"",
});


React.useEffect(()=>{
  dispatch(getItem())
},[itemChange,dispatch]);

const typeArrayNames:string[]=typeArray.map((item:any)=>{
     return item.itemTypeName
})

const handleChangeUpdateBox = (e:any) => {
  const { name, value } = e.target;
  setItemInformation((prevState:any) => ({
    ...prevState,
    [name]: value,
  }));
};

const formatDate = (date:any) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formattedDate.getFullYear();
  return `${day}/${month}/${year}`;
};


React.useEffect(()=>{
     dispatch(getType())
},[dispatch,isChange]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

const itemTypeChange=(event:any)=>{
  setItemType((prevState:string)=>{
       return event.target.value;
  })
};


const addClick=()=>{
  let repeat=false;
  for(let i=0;i<typeArray.length;i++){
    if(itemType.toLowerCase().trim()===typeArray[i].itemTypeName.toLowerCase().trim()){
            repeat=true;
            break;
    }
  }
  if(repeat===false && itemType!==""){
    dispatch(createType({itemTypeName:itemType}))
  }

repeat=false;
    
}


const handleCloseTypeDialog = () => {
    dispatch(typeUpdateDialogClose())
};

const itemTypeHandleChange=(event:any)=>{
    setItemTypeUpdated(event.target.value)
}



const updateClick=()=>{
  dispatch(typeUpdateDialogClose())
  dispatch(updateType({"id":typeId,"itemTypeName":itemTypeUpdated}))
  dispatch(somethingChange())
  setItemTypeUpdated("");
}

const deleteClick=(id:string|any)=>{
    dispatch(deleteType(id));
    dispatch(somethingChange());
};


let itemTypeDialogDisplay:string="";
React.useEffect(()=>{
      for(let i=0;i<typeArray.length;i++){
        if(typeArray[i]._id===typeId){
          itemTypeDialogDisplay=typeArray[i].itemTypeName;
            dispatch(tempStore(itemTypeDialogDisplay))
        }
      }
},[isChange]);



const itemTypeDisplay:any[]=typeArray.map((item:any)=>{
  return (
   <li key={item._id}>   <ItemType key={item._id} id={item._id} deleteClick={deleteClick} item={item}/></li>
 
  )
});


const itemDisplay:any[]=itemArray.map((item:any)=>{

  if(valuetype===null){
    return (
      <ItemCard key={item._id} item={item}/>
     )
  }else{
    for(let i=0;i<typeArray.length;i++){
        if(valuetype===typeArray[i].itemTypeName){
            if(item.itemType===typeArray[i]._id){
              return (
                <ItemCard key={item._id} item={item}/>
               )
            }
        }
         
        
    }
  }
    
});


const handleClose = () => {
      dispatch(updateDialogClose());
};




const saveClick=()=>{
  let typeIdNew:string="";
  if(itemId){
    for(let i=0;i<typeArray.length;i++){
       if(valuet===typeArray[i].itemTypeName){
            typeIdNew=typeArray[i]._id;
            break;
       }
    }
  }
  if(itemId!==""){
    dispatch(updateItem({
      id:itemId,
      itemName:itemInformation.itemName,
      itemType:typeIdNew,
      quantity:itemInformation.quantity,
      price:itemInformation.price,
      description:itemInformation.description,
      supplierInformation:itemInformation.supplierInformation,
      storageLocation:itemInformation.storageLocation,
      expirationDate:itemInformation.expirationDate,
  
     })) 
  }
  
   
};

React.useEffect(()=>{
  let typeId:string="";
  if(itemId!==""){
    setItemInformation((prevState:any)=>{
      for(let i=0;i<itemArray.length;i++){
        if(itemId===itemArray[i]._id){
          typeId=itemArray[i].itemType;
           return {
               itemName:itemArray[i].itemName,
               price:itemArray[i].price,
               quantity:itemArray[i].quantity,
               description:itemArray[i].description,
               supplierInformation:itemArray[i].supplierInformation,
               storageLocation:itemArray[i].storageLocation,
               expirationDate:itemArray[i].expirationDate,
              

           }
        }
   }
    })

    setValuet((prevState:string|null)=>{
      
         for(let i=0;i<typeArray.length;i++){
            if(typeId===typeArray[i]._id){
                 return typeArray[i].itemTypeName;
            }
         }
    })
     
  }
},[itemChange])

const handleCloseDeletedDialog = () => {
   dispatch(deleteBoxClose())
};

const deleteClickItem=()=>{
   dispatch(deleteItems(itemId))
}

  return (
    <>
    <div className='in'>
       <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Add Item Type"  value="1" />
            <Tab label="Add Items" value="2" />
            <Tab label="Update Items" value="3" />
          </TabList>
        </Box>
        <TabPanel  value="1" >

          <>
          <div className='ait'>
          <TextField id="outlined-basic" onChange={itemTypeChange} value={itemType} sx={{width:"300px"}} label="Add Items Type" size="small" variant="outlined" />
         {loading===false &&<div style={{marginLeft:"30px"}}><Button variant="contained" onClick={addClick}  size="small">Add</Button></div> }
         {loading===true && <div style={{marginLeft:"30px"}} > <Button variant="contained"  disabled size="small">Add</Button></div> }
          </div>

         { <ol className='ol'>
            {itemTypeDisplay}
          </ol>}
          </>


        </TabPanel>
        <TabPanel value="2">
         <div>
          <p className="err-m">{errorMessage}</p>
         <div>
          <ItemForm/>
          </div>
         </div>
         


        </TabPanel>


        <TabPanel value="3">
          <>
          <div>
           
           <div>
           <Autocomplete
  disablePortal
  id="combo-box-demo"
  value={valuetype}
  onChange={(event: any, newValue: string | null) => {
    setValuetype(newValue);
  }}
  options={typeArrayNames}
  sx={{ width: 300 }}
  renderInput={(params) => <  TextField {...params} label="Choose Item Type" sx={{marginBottom:"20px",marginLeft:"50px"}} />}
/>
           </div>

          <div>
            {itemDisplay}
            </div>
            
          </div>

          <div>
          <Dialog
        open={openu}
        onClose={handleClose}
       PaperProps={{sx:{width:"60vw"}}}
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Item"}
        </DialogTitle>
        <DialogContent>
        <div className="update-dialog">
          <p className='error-message'>{errorMessage}</p>
        <input type="text" placeholder="Item Name" name="itemName" 
        value={itemInformation.itemName}
         onChange={handleChangeUpdateBox} className="input-box"/>

        <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={typeArrayNames}
  onChange={(event: any, newValue: string | null) => {
    setValuet(newValue);
  }}
  value={valuet}
  sx={{ width: "100%",marginBottom:"10px" }}
  renderInput={(params) => <TextField sx={{marginTop:"10px" }} {...params} label="Type of the Item" />}
/>
        <input type="number" name="quantity"  value={itemInformation.quantity}
          onChange={handleChangeUpdateBox} placeholder="Quantity" className="input-box"/>

  <input type="text" name="supplierInformation"  value={itemInformation.supplierInformation}
   onChange={handleChangeUpdateBox} placeholder="Supplier Information" className="input-box"/>

  <input type="number" name="price"  value={itemInformation.price}
   onChange={handleChangeUpdateBox} 
   placeholder="Price" className="input-box"/>

  <input type="text" name="description"  value={itemInformation.description}
   onChange={handleChangeUpdateBox} placeholder="Description" className="input-box"/>

  <input type="text" name="storageLocation"  value={itemInformation.storageLocation}
  onChange={handleChangeUpdateBox} placeholder="Storage Location" className="input-box"/>

  <TextField
       sx={{marginTop:"15px"}}
        id="expirationDate"
        name="expirationDate"
        label="Expiration Date"
        onChange={handleChangeUpdateBox}
        type="date"
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
        </div>
        </DialogContent>
        <DialogActions>
          {updateLoading===false && <Button variant="contained" size="small" color="success" onClick={saveClick}>save changes</Button>}
         {updateLoading===true &&  <Button variant="contained" size="small" color="success" disabled>save changes</Button>}
          <Button variant="contained" size="small" color="error" onClick={handleClose}>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
          </div>
          </>
        </TabPanel>
      </TabContext>
    </Box>
      </div>


      <div>
      <Dialog
        open={opentu}
        onClose={handleCloseTypeDialog }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >
            <p className="uit">Update Item Type <span>{temp}</span></p>
        </DialogTitle>
        <DialogContent>
          <div style={{margin:"20px"}}> 
              <TextField  label="Item Type"
              onChange={itemTypeHandleChange} value={itemTypeUpdated} variant="outlined" sx={{width:"400px"}} /></div>
  
        </DialogContent>
        <DialogActions>
          <Button 
          variant="contained" size="small" 
          color="success" onClick={updateClick}>update</Button>
          <Button 
          variant="contained" size="small" 
          color="error"
          onClick={handleCloseTypeDialog }>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
      </div>



      <div>
      <Dialog
        open={opend}
        onClose={handleCloseDeletedDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to delete ?"}
        </DialogTitle>
       
        <DialogActions>
          <Button variant="contained" 
          color="error" size="small" onClick={deleteClickItem} >delete</Button>
          <Button variant="contained" 
          color="primary" size="small" onClick={handleCloseDeletedDialog}>
            No
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      </>
  )
}

export default Inventory