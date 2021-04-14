import React, {useEffect, useState} from "react";
import "./Product.css";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {Collapse, Spinner} from "react-bootstrap";
import SlideModal from "../SlideModal/SlideModal";
import RatingBar from "../RatingBar/RatingBar";

function Product({myCardList}) {

    const [product, setProduct] = useState();

    const [isSlideModalShow, setIsSlideModalShow] = useState(false);

    const [chooseType, setChooseType] = useState("");

    const [selSize, setSelSize] = useState("");

    const [selColor, setSelColor] = useState("");

    // console.log(test);

    const params = useParams().id;

    function showSlideModal(type) {
        setChooseType(type);
        (document.getElementById("product-content").classList.add("overflow-hide"));
        // console.log("click");
        setIsSlideModalShow(true);
    }

    useEffect(() => {
        if (isSlideModalShow === false) (document.getElementById("product-content")?.classList.remove("overflow-hide"));
    }, [isSlideModalShow])

    useEffect(() => {
        if (!product) {
            setProduct(myCardList.find(product => product.id === parseInt(params))); //undefined
            // myCardList.find(product => product.id === parseInt(params))
            // console.log("set");
        }
        // console.log("open");
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
                    <div id="product-content" className="product-content">
                        <span className='product-img'>
                            <img src={product.img} alt="product-img"/>
                        </span>
                        <div className="product-top">
                            <div className="product-selectors">
                                <span className="product-size">
                                   Size <button onClick={() => {
                                    showSlideModal("size")
                                }}>
                                    {selSize ? selSize : "Choose"}
                                    </button>
                                </span>
                                <span className="product-color">
                                    Color  <button onClick={() => {
                                    showSlideModal("color")
                                }}>
                                        {selColor ? selColor : "Choose"}
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
                                <RatingBar isSelectable={true}/>
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
                        <button className="product-toCart" onClick={() => {
                        }}>ADD TO CART
                        </button>
                    </div>
                    <SlideModal isActive={isSlideModalShow}
                                setActive={setIsSlideModalShow}>
                        <div className="picker-title">
                            Select size
                        </div>
                        <div className="picker-buttons">
                            {chooseType === "size" &&
                            (
                                <>
                                    <button className={selSize === "XS" ? "picker-active" : null} onClick={() => {
                                        setSelSize("XS")
                                    }}>XS
                                    </button>
                                    <button className={selSize === "S" ? "picker-active" : null} onClick={() => {
                                        setSelSize("S")
                                    }}>S
                                    </button>
                                    <button className={selSize === "M" ? "picker-active" : null} onClick={() => {
                                        setSelSize("M")
                                    }}>M
                                    </button>
                                    <button className={selSize === "L" ? "picker-active" : null} onClick={() => {
                                        setSelSize("L")
                                    }}>L
                                    </button>
                                    <button className={selSize === "XL" ? "picker-active" : null} onClick={() => {
                                        setSelSize("XL")
                                    }}>XL
                                    </button>
                                </>
                            )
                            }
                            {chooseType === "color" &&
                            (
                                <>
                                    <button className={selColor === "Red" ? "picker-active" : null} onClick={() => {
                                        setSelColor("Red")
                                    }}>
                                        Red
                                    </button>
                                    <button className={selColor === "White" ? "picker-active" : null} onClick={() => {
                                        setSelColor("White")
                                    }}>
                                        White
                                    </button>
                                </>
                            )
                            }
                        </div>
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