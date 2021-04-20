

export function setCardList(cardList){
    // console.log(cardList);
    return {
        type: "setCardList",
        payload: cardList
    }
}

export function addItemToCart(item){
    return {
        type: "addToCart",
        payload: item
    }
}

export function deleteItemFromCart(item){
    // console.log(cardList);
    return {
        type: "deleteFromCart",
        payload: item
    }
}