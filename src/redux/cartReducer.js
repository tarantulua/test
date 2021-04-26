const initialState = {
    cart: []
}

export const cartReducer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case "addToCart" : {
            let productIndex = state
                .cart
                .findIndex(product => product.id === action.payload.id
                    && product.color === action.payload.color
                    && product.size === action.payload.size)

            if (productIndex !== -1) {
                let oldCart = state.cart;
                oldCart[productIndex].count += 1;
                return {...state, cart: oldCart}
            }

            return {...state, cart: state.cart.concat(action.payload)}
        }

        case "deleteFromCart" :{
            let productIndex = state
                .cart
                .findIndex(product => product.id === action.payload.id
                    && product.color === action.payload.color
                    && product.size === action.payload.size)

            if (productIndex !== -1) {
                let oldCart = state.cart;

                if (oldCart[productIndex].count > 1) {
                    oldCart[productIndex].count -= 1;
                    return {...state, cart: oldCart}
                }
                oldCart.splice(productIndex, 1);

                return {...state, cart: oldCart}
            }

            return {...state, cart: state.cart.concat(action.payload)}
        }
        
        default:
            return state
    }
}