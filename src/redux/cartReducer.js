const initialState = {
    cart: []
}

export const cartReducer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type){
        case "addToCart" :
            // console.log(action.payload);
            return {...state, cart: state.cart.concat(action.payload)};
        default: return state;
    }
}