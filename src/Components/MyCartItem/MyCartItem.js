import React from "react";
import "./MyCartItem.css";

function MyCartItem({item}){

    return(
        <div className="myCart-item">
            <img className="my-cart-item-img" src={item.img} alt="product.img"/>
            <div className="my-cart-item-name"><big>{item.name}</big></div>
            <div className="my-cart-item-size">Size: {item.size}</div>
            <div className="my-cart-item-color">Color: {item.color}</div>
            <div className="my-cart-item-price">{item.price}$</div>
        </div>
    );

}

export default MyCartItem;