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




const Inventory = () => {
  const dispatch=useDispatch();
  const temp=useSelector((state:any)=>state.type.temp);
  const opentu=useSelector((state:any)=>state.type.opentu);
  const typeId=useSelector((state:any)=>state.type.typeId);
  const isChange=useSelector((state:any)=>state.type.isChange);
  const typeArray=useSelector((state:any)=>state.type.typeArray);
  const itemArray=useSelector((state:any)=>state.item.itemArray);
  const loading=useSelector((state:any)=>state.type.loading);
  const [value, setValue] = React.useState('1');
const [itemType,setItemType]=React.useState<string>("");
const [itemTypeUpdated,setItemTypeUpdated]=React.useState<string>("");
const errorMessage=useSelector((state:any)=>state.item.errorMessage);


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



const itemTypeDisplay=typeArray.map((item:any)=>{
  return (
   <li key={item._id}>   <ItemType key={item._id} id={item._id} deleteClick={deleteClick} item={item}/></li>
 
  )
});


const itemDisplay=itemArray.map((item:any)=>{
     return (
      <ItemCard key={item._id} item={item}/>
     )
})


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
            {itemDisplay}
            </div>
            
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
      </>
  )
}

export default Inventory