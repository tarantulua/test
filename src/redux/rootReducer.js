import {combineReducers} from "redux";
import {cardListReducer} from "./cardListReducer";

export const  rootReducer = combineReducers({
   cardList: cardListReducer
});