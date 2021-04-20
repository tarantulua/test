import {combineReducers} from "redux";
import {cardListReducer} from "./cardListReducer";
import {cartReducer} from "./cartReducer";

export const  rootReducer = combineReducers({
   cardList: cardListReducer,
   cart: cartReducer
});