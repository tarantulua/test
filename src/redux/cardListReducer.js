const initialState = {
    cardList: []
}

export const cardListReducer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type){
        case "setCardList" :
            // console.log(action.payload);
            return {...state, cardList: action.payload};
        default: return state;
    }
}