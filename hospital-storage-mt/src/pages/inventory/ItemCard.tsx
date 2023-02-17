import React from 'react';
import './ItemCard.css';
import {useSelector,useDispatch} from "react-redux";
import {changing, getItemId,getDeletedItemId} from "../../features/itemSlice/itemSlice";


interface itemProps{
    item:any,
}
const ItemCard = (props:itemProps) => {

    const dispatch=useDispatch();
    let itemType:string="";
    const typeArray=useSelector((state:any)=>state.type.typeArray);
    for(let i=0;i<typeArray.length;i++){
        if(typeArray[i]._id===props.item.itemType){
           itemType=typeArray[i].itemTypeName;
           break;
        }
    };
    let expire:string="";
    let edate:string="";
    if(props.item.expirationDate!==null){
       edate=props.item.expirationDate.slice(0,10)
    }

    const today = new Date();
    const expiration = new Date(edate);
    

    if (expiration < today) {
      expire="Expired"
    } else if (expiration.toDateString() === today.toDateString()) {
      expire="The item will be expired today"
    } else {
      const timeDiff = Math.abs(expiration.getTime() - today.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
       expire=`The expiration date is in ${diffDays} days.`;
    }

    let color:string="";
    if(expire==="Expired"){
      color="red";
    }else if(expire==="The item will be expired today"){
      color="orange";
    }else{
       color="blue";
    }

    const editClick=()=>{
      dispatch(getItemId({required:props.item._id}))
      dispatch(changing())
    };

    const deleteClick=()=>{
      dispatch(getDeletedItemId({required:props.item._id}))
    }
let total:number=0;
total=Number(props.item.price )* Number(props.item.quantity)


  return (
    <div className="card">
      {props.item.expirationDate!==null && <p className='expire' style={{color:color}}>{expire}</p>}
      <div className="card__header">
        <h2 className="card__title">{props.item.itemName}</h2>
        <p className="card__type">Type: {itemType}</p>
      </div>

      <div className="card__body">
        <div className="card__property">
          <span className="card__property-name">Quantity:</span>
          <span className="card__property-value">{props.item.quantity}</span>
        </div>
        <div className="card__property">
          <span className="card__property-name">Supplier Information:</span>
          <span className="card__property-value">{props.item.supplierInformation}</span>
        </div>
        <div className="card__property">
          <span className="card__property-name">Price:</span>
          <span className="card__property-value">Rs. {props.item.price}</span>
        </div>

       {props.item.description!=="" &&  <div className="card__property">
          <span className="card__property-name">Description:</span>
          <span className="card__property-value">{props.item.description}</span>
        </div>}

       {props.item.storageLocation !=="" &&  <div className="card__property">
          <span className="card__property-name">Storage Location:</span>
          <span className="card__property-value">{props.item.storageLocation}</span>
        </div>}

       {props.item.expirationData!==null &&  <div className="card__property">
          <span className="card__property-name">Expiration Date:</span>
          <span className="card__property-value">{edate}</span>
        </div>}

        <div className="card__property">
          <span className="card__property-namet">Total:</span>
          <span className="card__property-valuet">Rs. {total}</span>
        </div>

      </div>
      <div className="card__footer">
        <button className="card__button-u" onClick={editClick}>Edit</button>
        <button className="card__button-d" onClick={deleteClick}>Delete</button>
      </div>

      

    </div>
  );
}

export default ItemCard;



