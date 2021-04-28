

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

export function getItem(id){

    return {
        type: "getItem",
        payload: id
    }
}

export function deleteItemFromCart(id){
    // console.log(cardList);
    return {
        type: "deleteFromCart",
        payload: id
    }
}