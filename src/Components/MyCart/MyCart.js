import React from "react";
import "./MyCart.css"
import {connect} from "react-redux";
import {deleteItemFromCart} from "../../redux/actions"

function MyCart({cart, deleteItemFromCart}) {

    console.log(cart);

    return (
        <div className="myCart">
            {
                cart.length > 0
                    ?
                    (<>
                        {cart.map((item)=>{
                                return (
                                    <div key={item.id}>
                                        {item.Name}
                                    </div>
                                )
                            })}
                        </>
                    )
                    :
                    (
                        <label>No item on cart.</label>
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