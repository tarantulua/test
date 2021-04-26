import React, {useEffect, useState} from "react";
import "./Product.css";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {Collapse, Spinner} from "react-bootstrap";
import SlideModal from "../SlideModal/SlideModal";
import RatingBar from "../RatingBar/RatingBar";
import {addItemToCart} from "../../redux/actions";

function Product({myCardList, addItemToCart}) {

    const [product, setProduct] = useState();

    const [isSlideModalShow, setIsSlideModalShow] = useState(false);

    const [chooseType, setChooseType] = useState("");

    const [selSize, setSelSize] = useState("");

    const [selColor, setSelColor] = useState("");

    const [open, setOpen] = useState(false);

    // const isDisabledButton = useRef();

    // const [checkBool,setCheckBool] = useState(false);

    const params = useParams().id;


//<-- MUST BE CHANGE
    let checkArray = [];

    let forPrice;

    if (selSize !== "" && selColor !== "") {
        forPrice = product.variants.find(variant => variant[1] === selSize && variant[2] === selColor);
    }

    let max = 0, min = 9999999999999999999;

    product?.variants.forEach((variant) => {
        if (max < variant[3]) max = variant[3];
        if (min > variant[3]) min = variant[3];
    });
//<-- END OF MUST BE CHANGE


    // console.log(min, max)

    function showSlideModal(type) {
        setChooseType(type);
        (document.getElementById("product-content")?.classList.add("overflow-hide"));
        setIsSlideModalShow(true);
    }

    useEffect(() => {
        if (isSlideModalShow === false) (document.getElementById("product-content")?.classList.remove("overflow-hide"));
    }, [isSlideModalShow])

    useEffect(() => {
        if (!product) {
            setProduct(myCardList.find(product => product.id === parseInt(params))); //undefined
        }
        (document.getElementById("site-header")).className = "site-header hide0";
    }, [myCardList, params, product])

    useEffect(() => {
        return () => {
            let header = document.getElementById("site-header");
            header?.classList.remove("hide0");
            header?.classList.remove("hide");
        }
    }, [])

    function addToCart() {
        if (selSize !== "" && selColor !== "" && forPrice) {
            addItemToCart( {
                id : product.id,
                name : product.Name,
                specs : product.specs,
                img : product.img,
                type : product.type,
                size : selSize,
                color : selColor,
                price : forPrice[3],
                count : 1
            } );
        }
        else {
            alert("Cann`t add. Item out of stock!");
        }
    }


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
                                    {selSize === "" || selColor === "" ? (
                                            <>{min} - {max}</>
                                        )
                                        :
                                        (
                                            <>
                                                {
                                                    forPrice ?
                                                    (
                                                        <>
                                                            {
                                                                forPrice[3]
                                                            }
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            Out of stock
                                                        </>
                                                    )
                                                }
                                            </>
                                        )

                                    }
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
                            <button className="product-toCart" onClick={addToCart}>ADD TO CART
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
                                        {product.variants.map((variant, index) => {
                                            if (!checkArray.includes(variant[1])) {
                                                checkArray.push(variant[1]);
                                                // if (checkBool != true) setCheckBool(Boolean(selColor !== "" && variant[2] !== selColor));
                                                return (
                                                    // disabled={checkBool}
                                                    <button key={index}
                                                            className={selSize === variant[1] ? "picker-active" : null}
                                                            onClick={
                                                                () => {
                                                                    if (selSize !== variant[1])
                                                                        setSelSize(variant[1])
                                                                    else setSelSize("");
                                                                }
                                                            }>{variant[1]}
                                                    </button>
                                                )
                                            }
                                            return <></>
                                        })}
                                    </>
                                )
                                }
                                {chooseType === "color" &&
                                (
                                    <>
                                        {product.variants.map((variant, index) => {
                                            if (!checkArray.includes(variant[2])) {
                                                checkArray.push(variant[2]);
                                                // console.log(variant[1], Boolean(selSize !== "" && variant[1] !== selSize));
                                                return (
                                                    //  disabled={selSize !== "" && variant[1] !== selSize ? true : false}
                                                    <button key={index}
                                                            className={selColor === variant[2] ? "picker-active" : null}
                                                            onClick={
                                                                () => {
                                                                    if (selColor !== variant[2])
                                                                        setSelColor(variant[2])
                                                                    else setSelColor("")
                                                                }
                                                            }>{variant[2]}
                                                    </button>
                                                )
                                            }
                                            return <></>
                                        })}
                                    </>
                                )
                                }
                            </div>
                        </SlideModal>
                    </div>
                )
                : (
                    <div className="product-loading">
                        <Spinner animation="border" style={{width: "6rem", height: "6rem"}}/>
                    </div>
                )
            }
        </>
    );
}

const cardListStateToProps = state => {
    return {
        myCardList: state.cardList.cardList
    }
}

const mapDispatchToProps = {
    addItemToCart
}

export default connect(cardListStateToProps, mapDispatchToProps)(Product);