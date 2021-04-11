import React, {useEffect, useState} from "react";
import "./Product.css";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {Collapse} from "react-bootstrap";

function Product({myCardList}) {

    const [product,setProduct] = useState();

    const params = useParams().id;

    useEffect(()=>{
        if (!product) {
            setProduct(myCardList.find(product => product.id === parseInt(params)));
            // console.log("set");
        }
        console.log("open");
        (document.getElementById("site-header")).className="site-header hide0";
    })

    useEffect(()=>{
        return  () => {
            console.log("closed");
            (document.getElementById("site-header")).classList.remove("hide0")
        }
    },[])

    const [open, setOpen] = useState(false);

    // console.log(product);

    return (
        <>
            { product && (
                <div className="product">
                    {/*<button>dsadsdas</button>*/}
                    <div className="product-content">
                        <span className='product-img'>
                            <img src={product.img} alt="product-img"/>
                        </span>
                        <div className="product-top">
                            <div className="product-title">
                                {product.Name}
                            </div>
                            <div className="product-price">
                               price
                            </div>
                            <div className="product-category">
                                categoty
                            </div>
                            <div className="product-rating">
                                rating
                            </div>
                        </div>
                        <button className="myExpand-button" onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}>
                            See specs
                        </button>
                        <Collapse in={open}>
                            <div id="product-specs">
                                {product.specs}
                            </div>
                        </Collapse>
                        <button className="product-toCart">ADD TO CART</button>
                    </div>
                </div>
            )}
        </>
    );

}

const cardListStateToProps = state => {
    return {
        myCardList: state.cardList.cardList
    }
}

export default connect(cardListStateToProps)(Product);