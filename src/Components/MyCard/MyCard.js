import React, {useState} from "react";
import "./MyCard.css"
import {useHistory} from "react-router-dom"

function MyCard({myCard, index}) {
    const history = useHistory();
    const [isLiked, setIsLiked] = useState(false);

    const myImgStyle = {
        backgroundImage: `url(${myCard.img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }


    function liked(event) {
        event.stopPropagation();
        setIsLiked(!isLiked);
        console.log(isLiked);
    }


    return (
        <div className="myCard" onClick={() => { history.push(`/item/${myCard.id}`);}}>
            {/*<div className="myCard-content">*/}
            <div className="myCard-img" style={myImgStyle}>
                <div className="myCard-blackBox"/>
                <div className="myCard-specs">
                    <label>
                        {myCard.specs}
                    </label>
                </div>
            </div>
            <div className="myCard-title">
                {myCard.Name}
            </div>
            {/*<div className="myCard-buttonContainer">*/}
            {/*    <button className="myCard-button" onClick={() => {*/}
            {/*        history.push(`/item/${myCard.id}`);*/}
            {/*    }}>Переглянути*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*</div>*/}
            <button className={`likeButton ${isLiked === true ? "liked" : ""}`.trim()}
                    onClick={event => {liked(event);}}>
                <label>♥</label>
            </button>
        </div>
    )
}

export default MyCard;