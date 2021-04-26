import React from "react";
import {connect} from "react-redux"
import { addItemToCart, deleteItemFromCart } from "../../redux/actions"
import "./MyCartItem.css";

function MyCartItem({item,addItemToCart,deleteItemFromCart,changed, setChanged}){

    return(
        <div className="myCart-item">
            <img className="my-cart-item-img" src={item.img} alt="product.img"/>
            <div className="my-cart-item-name"><big>{item.name}</big></div>
            <div className="my-cart-item-size">Size: {item.size}</div>
            <div className="my-cart-item-color">Color: {item.color}</div>
            <div className="my-cart-item-price">{(item.price * item.count).toFixed(2)}$</div>
            <div className="my-cart-item-count">
                <button onClick = {()=>{deleteItemFromCart(item); setChanged(!changed)}}>-</button>
                <label>{item.count}</label>
                <button  disabled={ item.count === 99 }
                         onClick = {()=>{addItemToCart(item); setChanged(!changed)}}>+</button>
                </div>
        </div>
    );
}

const mapDispatchToProps = {
    addItemToCart,
    deleteItemFromCart
}

export default connect(null,mapDispatchToProps)(MyCartItem);