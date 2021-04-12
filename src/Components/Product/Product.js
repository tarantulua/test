import React, {useEffect, useState} from "react";
import "./Product.css";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {Collapse, Spinner} from "react-bootstrap";
import SlideModal from "../SlideModal/SlideModal";

function Product({myCardList}) {

    const [product, setProduct] = useState();

    const [isSlideModalShow, setIsSlideModalShow] = useState(false);

    const params = useParams().id;

    useEffect(() => {
        if (!product) {
            setProduct(myCardList.find(product => product.id === parseInt(params))); //undefined
            // myCardList.find(product => product.id === parseInt(params))
            // console.log("set");
        }
        console.log("open");
        (document.getElementById("site-header")).className = "site-header hide0";
    }, [myCardList, params, product])

    useEffect(() => {
        return () => {
            console.log("closed");
            let header = document.getElementById("site-header");
            header.classList.remove("hide0");
            header.classList.remove("hide");
        }
    }, [])

    const [open, setOpen] = useState(false);

    // console.log(product);
    return (
        <>
            {product ? (
                <div className="product">
                    {/*<button>dsadsdas</button>*/}
                    <div className="product-content">
                        <span className='product-img'>
                            <img src={product.img} alt="product-img"/>
                        </span>
                        <div className="product-top">
                            <div className="product-selectors">
                                <span className="product-size">
                                   Size <button onClick={()=>{ console.log("click"); setIsSlideModalShow(true)}}>
                                     Choose
                                    </button>
                                </span>
                                <span className="product-color">
                                    Color <button>
                                        Choose
                                        </button>
                                </span>
                            </div>
                            <div className="product-title">
                                {product.Name}
                            </div>
                            <div className="product-price">
                                19.99$
                            </div>
                            <div className="product-category">
                                Categories
                            </div>
                            <div className="product-rating">
                                Rating star must be here!
                            </div>
                        </div>
                        <button className={`myExpand-button ${open ? "" : "m-bot60px"}`} onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}>
                            See specs
                        </button>
                        <Collapse in={open}>
                            <div id="product-specs">
                                {product.specs}
                            </div>
                        </Collapse>
                        <div className="prouct-margin"/>
                        <button className="product-toCart">ADD TO CART</button>
                    </div>
                    <SlideModal isActive={isSlideModalShow}
                                setActive={setIsSlideModalShow}>
                        <div>dsada</div>
                    </SlideModal>
                </div>
            ) : (<div className="product-loading"><Spinner animation="border" style={{width: "6rem", height: "6rem"}}/>
            </div>)
            }
        </>
    );
}

const cardListStateToProps = state => {
    return {
        myCardList: state.cardList.cardList
    }
}

export default connect(cardListStateToProps)(Product);