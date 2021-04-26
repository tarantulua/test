import React, {useEffect, useState} from "react";
import "./MyCart.css"
import {connect} from "react-redux";
// import {deleteItemFromCart} from "../../redux/actions"
import MyCartItem from "../MyCartItem/MyCartItem";

function MyCart({cart}) {

    const [totalPrice,setTotalPrice] = useState(0);

    const [changed, setChanged] = useState();

    useEffect(()=>{
        let tempTotalPrice = 0;
        cart.forEach(product =>{
            tempTotalPrice += product.price * product.count
        })
        setTotalPrice(tempTotalPrice);
    },[cart,changed])

    return (
        <div className="myCart">
            {
                cart.length > 0
                    ?
                    (
                        <>
                            <div className="myCart-list">
                                {cart.map((product, index) => {
                                    return (
                                        <MyCartItem key={index} item={product} changed = {changed} setChanged = {setChanged}/>
                                    )
                                })}
                            </div>
                            <div className="myCart-stats">
                                <>{totalPrice.toFixed(2)}$</>
                            </div>
                            <div className="myCart-spacer"/>
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

// const mapDispatchToProps = {
//     deleteItemFromCart
// }

export default connect(mapStateToProps, null)(MyCart);