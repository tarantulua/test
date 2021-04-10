import React, {useState} from "react";
import "./Product.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Collapse} from "react-bootstrap";


function Product() {
    const [open, setOpen] = useState(false);

    const params = useParams().id;

    const product = useSelector(state => state.cardList.cardList).find(product => product.id === parseInt(params));

    // console.log(typeof params);



    // const productImgStyle = {
    //     backgroundImage: `url(${product.img})`,
    //     backgroundSize: "contain",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "center"
    // }

    // console.log(product);

    return (
        <div className="product">
            {/*<button>dsadsdas</button>*/}
            <div className="product-content">
                <div className='product-img'>
                    <img src={product.img} alt="product-img"/>
                </div>
                <div className="product-title">
                    {product.Name}
                </div>

                <button className="myExpand-button" onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}>
                    See specs
                </button>
                <Collapse in={open}>
                    <div id="product-secs">
                        {product.specs}
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

export default Product;