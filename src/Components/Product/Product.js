import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import "./Product.css";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {Collapse, Spinner} from "react-bootstrap";
import SlideModal from "../SlideModal/SlideModal";
import RatingBar from "../RatingBar/RatingBar";
import {addItemToCart} from "../../redux/actions";
import cartIcon from "./cart_icon.png";

function Product({myCardList, addItemToCart, cartCount}) {

    const [product, setProduct] = useState();

    const [isSlideModalShow, setIsSlideModalShow] = useState(false);

    const [chooseType, setChooseType] = useState("");

    const [open, setOpen] = useState(false);

    const params = useParams().id;

    const [options, setOptions] = useState();

    const [selectedProduct, setSelectedProduct] = useState({});

    const isAllSelected = useRef(false);

    let checkArray = [];

    const maxPrice = useRef(0);

    const minPrice = useRef(9999999999)

    const userProduct = useRef()

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

    useEffect(() => {
        let optionsTemp = [];

        if (product) {
            Object.entries(product.options[0]).forEach((option, index) => {
                optionsTemp.push(option[1])
            })

            product?.variants.forEach((variant) => {
                if (maxPrice.current < variant.Price) maxPrice.current = variant.Price
                if (minPrice.current > variant.Price) minPrice.current = variant.Price
            });
        }

        setOptions(optionsTemp)
    }, [product])


    function validateIsAllSelected() {
        if (options) {
            try {
                options.forEach(option => {
                    if (option !== "Price") {
                        if (selectedProduct[option] && selectedProduct[option] !== "") {
                            isAllSelected.current = true
                        } else {
                            isAllSelected.current = false;
                            throw new Error();
                        }
                    }
                });
            } catch {
            }
        }

        if (isAllSelected.current) {
            // price.current = product.variants.find(variant => variant.contain(selectedProduct));
            let forFind = JSON.stringify(selectedProduct).replaceAll("{", "").replaceAll("}", "")
            userProduct.current = (product.variants.find(variant => JSON.stringify(variant).includes(forFind)))
        }

    }

    function selectOption(optionValue) {
        let pair = {[chooseType]: optionValue}
        setSelectedProduct({...selectedProduct, ...pair})
    }

    function addToCart() {
        if (isAllSelected.current && userProduct.current) {

            let optionsObj = options.reduce(function (acc, cur, i) {
                acc[i] = cur;
                return acc;
            }, {});

            addItemToCart({
                id: product.id,
                name: product.Name,
                specs: product.specs,
                img: product.img,
                type: product.type,
                options: optionsObj,
                variant: userProduct.current,
                count: 1
            })
            let cartElement = document.getElementById("product-cart")
            cartElement.classList.add("show")
            setTimeout(() => {
                cartElement.classList.remove("show")
            }, 4000);
        } else {
            alert("Cann`t add. Item out of stock!")
        }
    }

//<-- MUST BE CHANGE
    validateIsAllSelected()
//<-- END OF MUST BE CHANGE

    return (
        <>
            {product ? (
                    <div className="product">
                        <div id="product-content" className="product-content">
                        <span className='product-img'>
                            <img src={product.img} alt="product-img"/>
                        </span>
                            <div className="product-top">
                                <div className="product-selectors-container">
                                    {
                                        options.map((option, index) => {
                                            if (option !== "Price")
                                                return (
                                                    <button key={index}
                                                            className={`product-selector ${
                                                                selectedProduct[option] && selectedProduct[option] !== ""
                                                                    ? ""
                                                                    : "notSelected"
                                                            }`}
                                                            onClick={event => {
                                                                showSlideModal(option)
                                                            }}>
                                                        {selectedProduct[option] && selectedProduct[option] !== ""
                                                            ? selectedProduct[option]
                                                            : option
                                                        }
                                                    </button>
                                                )
                                            return null
                                        })
                                    }
                                </div>
                                <div className="product-title">
                                    {product.Name}
                                </div>
                                <div className="product-price">
                                    {
                                        !isAllSelected.current
                                            ? (
                                                <>{minPrice.current}$ - {maxPrice.current}$</>
                                            )
                                            : (
                                                <>
                                                    {
                                                        userProduct.current ? (
                                                            <>
                                                                {userProduct.current.Price}$
                                                            </>
                                                        ) : (
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
                                    <RatingBar isSelectable={false} rating={2}/>
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
                            <div className="product-margin"/>
                            <button className="product-toCart" onClick={addToCart}>ADD TO CART
                            </button>
                        </div>
                        <SlideModal isActive={isSlideModalShow}
                                    setActive={setIsSlideModalShow}
                        >
                            <div className="picker-title">
                                Select {chooseType}
                            </div>
                            <div className="picker-buttons">
                                {
                                    product.variants.map((variant, index) => {
                                        if (!checkArray.includes(variant[chooseType])) {
                                            checkArray.push(variant[chooseType]);
                                            return (
                                                <button key={index}
                                                        className={selectedProduct[chooseType] === variant[chooseType]
                                                            ? "picker-active"
                                                            : ""}
                                                        onClick={
                                                            event => {
                                                                if (selectedProduct[chooseType] !== variant[chooseType])
                                                                    selectOption(event.target.textContent)
                                                                else selectOption("")
                                                            }
                                                        }>{variant[chooseType]}
                                                </button>
                                            )
                                        }
                                        return null
                                    })
                                }
                            </div>
                        </SlideModal>
                        <div id="product-cart" className="product-cart">
                            <NavLink to="/cart" style={{textDecoration: 'none'}}>
                                <label className="cart-count">{cartCount}</label>
                                <img src={cartIcon} alt="cart"/>
                            </NavLink>
                        </div>
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
    let cartCount = 0;
    if (state.cart.cart.length !== 0) {
        state.cart.cart.forEach(product => {
            cartCount += product.count;
        })
    }
    return {
        myCardList: state.cardList.cardList,
        cartCount: cartCount
    }
}

const mapDispatchToProps = {
    addItemToCart
}

export default connect(cardListStateToProps, mapDispatchToProps)(Product);