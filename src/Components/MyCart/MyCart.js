import React, {useEffect, useState} from "react";
import "./MyCart.css"
import {connect} from "react-redux";
import {deleteItemFromCart} from "../../redux/actions"
import MyCartItem from "../MyCartItem/MyCartItem";

function MyCart({cart, deleteItemFromCart}) {

    const [totalPrice,setTotalPrice] = useState(0);

    // console.log(cart);

    useEffect(()=>{
        let tempTotalPrice = 0;
        cart.forEach(product =>{
            tempTotalPrice += product.price
        })
        setTotalPrice(tempTotalPrice);
    },[cart])

    console.log(totalPrice);

    return (
        <div className="myCart">
            {
                cart.length > 0
                    ?
                    (
                        <>
                            <div className="myCart-list">
                                {cart.map((product, index) => {
                                    console.log(product);
                                    return (
                                        <MyCartItem key={index} item={product}/>
                                    )
                                })}
                            </div>
                            <div className="myCart-stats">
                                <>{totalPrice}$</>
                            </div>
                        </>
                    )
                    :
                    (
                        <label>No item in cart.</label>
                    )
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = {
    deleteItemFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);