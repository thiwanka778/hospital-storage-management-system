import React from 'react';
import './ItemCard.css';
import {useSelector,useDispatch} from "react-redux";
import {changing, getItemId} from "../../features/itemSlice/itemSlice";


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

    let edate:string="";
    if(props.item.expirationDate!==null){
       edate=props.item.expirationDate.slice(0,10)
    }

    const editClick=()=>{
      dispatch(getItemId({required:props.item._id}))
      dispatch(changing())
    }
  return (
    <div className="card">
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

      </div>
      <div className="card__footer">
        <button className="card__button-u" onClick={editClick}>Edit</button>
        <button className="card__button-d">Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;



