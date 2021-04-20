import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import MyCard from "../MyCard/MyCard";
import {setCardList} from "../../redux/actions";
import "./MyCardList.css"

function MyCardList({myCardList}){
    const [scrollPos,setScrollPos] = useState(0);
    const [listElements, setListElements] = useState(0);
    const countOElements = 5;



    useEffect(() => {
        window.scrollTo(0,scrollPos);
    },[scrollPos]);

    function showMore(){
        setScrollPos(window.pageYOffset);
        setListElements(listElements + countOElements);
    }


    return(
            <div className="myCard-list">
                {myCardList.slice(0,listElements+countOElements).map((myCard, index) => {
                    return (
                        <MyCard key = {myCard.id}
                                myCard = {myCard}
                                index = {index}/>
                    )})}
                <div className="list-controls">
                    <button onClick={showMore}>Show More Content</button>
                </div>
            </div>
    );
}

const cardListDispatch = {
    setCardList
}

const cardListStateToProps = state =>{
    return{
        myCardList: state.cardList.cardList
    }
}

export default connect(cardListStateToProps,cardListDispatch)(MyCardList);