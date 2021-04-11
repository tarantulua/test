import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import "./ProductBlock.css";
import BlockList from "./BlockList";

function ProductsBlock({type, myCardList}) {

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        let list = [];
        let i = 0;
        myCardList.forEach(product => {
            if (product.Type === type) {
                list.push(product)
                i = i + 1;
            }
        })
        setProductsList(list.slice(0, 7))
    },[myCardList, type])

// console.log(productsList);



if (productsList.length !== 0)
    return (
        <div id = "productBlock"
             className={`productBlock ${type}`}>
            <div className="productBlock-top">
                <span className="productBlock-type">
                    {type.toUpperCase()}
                </span>
                <span className="productBlock-viewAll">
                    <label onClick={()=>{}}>View all</label>
                </span>
            </div>
            <div>
                { type === "new" && (
                   <>You`ve never seen it before!</>
                ) }
                { type === "sale" && (
                    <>Super sale</>
                ) }
            </div>
            <BlockList blockProducts={productsList}/>
        </div>
    );

return (<></>);
}


const cardListStateToProps = state => {
    return {
        myCardList: state.cardList.cardList
    }
}

export default connect(cardListStateToProps, null)(ProductsBlock);


